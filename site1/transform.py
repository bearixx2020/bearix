import csv
import numpy as np

def read(k, file_name):
    data = csv.reader(open(file_name), delimiter=';')

    u = []
    v = []

    i = 0
    for row in data:
        i += 1
        if i > 4:
            u.append(float(row[k].replace(",", ".")))
            v.append(float(row[k+1].replace(",", ".")))

    return u, v

def transform(units, volts):
    m = np.fft.rfft(volts)
    n = volts.size
    fr = np.fft.rfftfreq(n)

    return np.abs(m).tolist(), fr.tolist()

def write(file, file_t, x, y, x_t, y_t):
    f = csv.writer(file)

    f.writerow(['unit', 'volts'])
    for j in range(0, x.shape[0]):
        f.writerow([x[j], round(y[j], 4)])

    f = csv.writer(file_t)

    f.writerow(['frequency', 'magnitude'])
    for j in range(0, x_t.shape[0]):
        f.writerow([format(x_t[j], '.6f'), round(np.abs(y_t[j]), 4)])

def minimize(x, y, delta, iterations, mag_resp):
    old_x = x
    old_y = y

    new_x = []
    new_y = []

    if mag_resp:
        for j in range(len(old_x) - 1):
            if old_x[j] < 0.2:
                new_x.append(old_x[j])
                new_y.append(old_y[j])

        old_x = new_x
        old_y = new_y

        new_x = []
        new_y = []

    for i in range(iterations):
        for j in range(len(old_x)//2 - 1):
            if abs(old_y[2*j] - old_y[2*j+1])*100/max(old_y[2*j], old_y[2*j+1]) < delta/(i*0.1 + 1):
                new_x.append((old_x[2*j] + old_x[2*j+1])/2)
                new_y.append((old_y[2*j] + old_y[2*j+1])/2)
            else:
                new_x.append(old_x[2*j])
                new_y.append(old_y[2*j])
                new_x.append(old_x[2*j+1])
                new_y.append(old_y[2*j+1])

        old_x = new_x
        old_y = new_y

        new_x = []
        new_y = []

    return np.array(old_x), np.array(old_y)


def sig_and_mag(k, file_name):

    units, volts = read(k, file_name)
    mag, freq = transform(np.array(units), np.array(volts))

    return units, volts, mag, freq