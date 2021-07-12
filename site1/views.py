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

def post_share(request, post_id):
    # Retrieve post by id
    post = get_object_or_404(Post, id=post_id, status='published')
    sent = False
    if request.method == 'POST':
        # Form was submitted
        form = EmailPostForm(request.POST)
        if form.is_valid():
            # Form fields passed validation
            cd = form.cleaned_data
            post_url = request.build_absolute_uri(post.get_absolute_url())
            subject = '{} ({}) recommends you reading "{}"'.format(cd['name'], cd['email'], post.title)
            message = 'Read "{}" at {}\n\n{}\'s comments: {}'.format(post.title, post_url, cd['name'], cd['comments'])
            send_mail(subject, message, 'admin@myblog.com',[cd['to']])
            sent = True
    else:
        form = EmailPostForm()
    return render(request, 'blog/post/share.html', {'post': post,
                                                    'form': form,
                                                    'sent': sent})