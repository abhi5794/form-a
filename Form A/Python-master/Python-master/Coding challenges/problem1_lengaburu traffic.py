
"""
problem 1: lengaburu traffic
Author : Abhijith Kumar
Number : 9740055714
E-mail : mail4abhijithkumar@gmail.com

"""
# initializing
from collections import OrderedDict
result = ''
time_orb=OrderedDict()

# get the weather
wthr = input().split(' ')[2]

# get the speed values for the orbits
Orb1_S = int(input().split(' ')[4])
Orb2_S = int(input().split(' ')[4])

# orbit attributes
class Orb():
    def __repr__(self):
        return('Orbit obj.')
    def __init__(self,dst,crt):
        self.dst=dst
        self.crt=crt
    
# creating Orbit objects
Orb1 = Orb(18,20)
Orb2 = Orb(20,10)

# vehicles object which looks at the attributes of the Orbit
class Vhcl(Orb):
    def __repr__(self):
        return('Vehicle obj.')
    def __init__(self,spd,ct,orbS,Orb_in):
        self.spd=min(spd,orbS)
        self.ct=ct
        self.dst=Orb_in.dst
        self.crt=Orb_in.crt
    def tm(self):
        tme = self.dst/self.spd*60 + self.crt*self.ct # time calculation in minutes
        return(tme)

# creating vehicles for Orb1
bke1 = Vhcl(10,2,Orb1_S,Orb1)
tuk1 = Vhcl(12,1,Orb1_S,Orb1)
car1 = Vhcl(20,3,Orb1_S,Orb1)

# creating vehicles for Orb2
bke2 = Vhcl(10,2,Orb2_S,Orb2)
tuk2 = Vhcl(12,1,Orb2_S,Orb2)
car2 = Vhcl(20,3,Orb2_S,Orb2)

# the determination of vehicle and orbit
if wthr == 'Sunny':
    Orb1.crt -= 0.1*Orb1.crt
    Orb2.crt -= 0.1*Orb2.crt
    time_orb['Orbit1 Bike'] = bke1.tm()
    time_orb['Orbit2 Bike'] = bke2.tm()
    time_orb['Orbit1 TukTuk'] = tuk1.tm()
    time_orb['Orbit2 TukTuk'] = tuk2.tm()
    time_orb['Orbit1 Car'] = car1.tm()
    time_orb['Orbit2 Car'] = car2.tm()

elif wthr == 'Rainy':
    Orb1.crt += 0.2*Orb1.crt
    Orb1.crt += 0.2*Orb1.crt
    time_orb['Orbit1 TukTuk'] = tuk1.tm()
    time_orb['Orbit2 TukTuk'] = tuk2.tm()
    time_orb['Orbit1 Car'] = car1.tm()
    time_orb['Orbit2 Car'] = car2.tm()

else:
    time_orb['Orbit1 Bike'] = bke1.tm()
    time_orb['Orbit2 Bike'] = bke2.tm()
    time_orb['Orbit1 Car'] = car1.tm()
    time_orb['Orbit2 Car'] = car2.tm()
result = min(time_orb,key=time_orb.get)

result = result.split(' ')
print('Vehicle {0} on {1}'.format(result[1],result[0]))

