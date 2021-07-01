from django.shortcuts import render


# Create your views here.
def get_example(request):
    return render(request,'example/index_example.html')

def get_home(request):
    return render(request,'main_window/index_home.html')

def get_uppload_csv(request):
    return render(request,'uppload_csv/index_upload.html')