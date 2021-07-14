from django.shortcuts import render
from django.core.mail import send_mail
from .transform import sig_and_mag
from .models import Data
import os
import csv
import codecs

# Create your views here.
def get_example(request):
    return render(request,'example/index_example.html')

def get_home(request):
    if request.method == 'POST' :
        Name = request.POST.get('Name')
        LastName = request.POST.get('LastName')
        Email = request.POST.get('Email')
        Message = request.POST.get('Message')
        
        data = {
            'name' : Name,
            'lastName': LastName, 
            'Email' : Email, 
            'Message' : Message
        }
        send_mail(data['Email'],data['Message'],'',['bearixx2020@gmail.com']) 
        print(data)

    return render(request,'main_window/index_home.html')

def get_uppload_csv(request):
    if request.method == 'POST':
        file_name = request.FILES['filename'].temporary_file_path()
        u = []
        v = []
        m = []
        f = []
        for k in range(0, 6, 2):
            un, vo, ma, fr = sig_and_mag(k, file_name)
            u.append(un)
            v.append(vo)
            m.append(ma)
            f.append(fr)
        Data.objects.create(units=u, volts=v, freqs=f, mags=m)

    return render(request,'uppload_csv/index_upload.html')

