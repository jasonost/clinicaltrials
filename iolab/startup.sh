#!/bin/bash

# install build tools 
sudo yum install make automake gcc gcc-c++ kernel-devel git-core -y 

# install python 2.7 and change default python symlink 
sudo yum install python27-devel -y 
sudo rm /usr/bin/python
sudo ln -s /usr/bin/python2.7 /usr/bin/python 

# yum still needs 2.6, so write it in and backup script 
sudo cp /usr/bin/yum /usr/bin/_yum_before_27 
sudo sed -i s/python/python2.6/g /usr/bin/yum 
sudo sed -i s/python2.6/python2.6/g /usr/bin/yum 

# should display now 2.7.5 or later: 
python -V 

# now install pip for 2.7 
sudo curl -o /tmp/ez_setup.py https://bootstrap.pypa.io/ez_setup.py

sudo /usr/bin/python27 /tmp/ez_setup.py 
sudo /usr/bin/easy_install-2.7 pip 
sudo pip install virtualenv

# should display current versions:
pip -V && virtualenv --version

sudo pip install numpy
sudo pip install pandas
sudo pip install nltk
sudo pip install dedupe
