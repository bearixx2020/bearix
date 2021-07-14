from django.shortcuts import render
from django.core.mail import send_mail

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
    return render(request,'uppload_csv/index_upload.html')

