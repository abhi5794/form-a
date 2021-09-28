"""
problem 2: mission impossible
Author : Abhijith Kumar
Number : 9740055714
E-mail : mail4abhijithkumar@gmail.com

"""
# initializing
time_orb,time_orb_2=(dict() for i in range(2))

# get the weather
wthr = input().split(' ')[2]

# get the speed values for the orbits
Orb1_S = int(input().split(' ')[5])
Orb2_S = int(input().split(' ')[5])
Orb3_S = int(input().split(' ')[5])
Orb4_S = int(input().split(' ')[5])

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
Orb3 = Orb(30,15)
Orb4 = Orb(15,18)

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
        tme = self.dst/self.spd*60 + self.crt*self.ct # time calculated in minutes
        return(tme)

# creating vehicles for Orb1
bke1 = Vhcl(10,2,Orb1_S,Orb1)
tuk1 = Vhcl(12,1,Orb1_S,Orb1)
car1 = Vhcl(20,3,Orb1_S,Orb1)

# creating vehicles for Orb2
bke2 = Vhcl(10,2,Orb2_S,Orb2)
tuk2 = Vhcl(12,1,Orb2_S,Orb2)
car2 = Vhcl(20,3,Orb2_S,Orb2)

# creating vehicles for Orb3
bke3 = Vhcl(10,2,Orb3_S,Orb3)
tuk3 = Vhcl(12,1,Orb3_S,Orb3)
car3 = Vhcl(20,3,Orb3_S,Orb3)

# creating vehicles for Orb2
bke4 = Vhcl(10,2,Orb4_S,Orb4)
tuk4 = Vhcl(12,1,Orb4_S,Orb4)
car4 = Vhcl(20,3,Orb4_S,Orb4)

def cal_opt(x1,x2,x3,x4,st):
    """ Function to calculate the optimum route, the output is a dictionary"""
    time_orb['Orbit1' + st] = x1.tm()
    time_orb['Orbit2' + st] = x2.tm()
    min_time = min(time_orb,key=time_orb.get)
    min_bike_val = time_orb[min_time]
    time_orb.clear()
    time_orb[min_time +'Orbit4'] = x4.tm() + min_bike_val
    
    # calculation for Orb3 + Orb4
    time_orb_2['Orbit3'+ st +'Orbit4'] = x3.tm() + x4.tm()
    fnl = dict(list(time_orb.items()) + list(time_orb_2.items())) # Adding two dictionaries
    fnl_key = min(fnl,key=fnl.get)
    fnl_value = fnl[fnl_key]
    fnl.clear()
    fnl[fnl_key] = fnl_value
    return(fnl)

# the determination of vehicle and orbit
if wthr == 'Sunny':
    Orb1.crt -= 0.1*Orb1.crt
    Orb2.crt -= 0.1*Orb2.crt
    
    x_bk=cal_opt(bke1,bke2,bke3,bke4,' Bike ')
    x_tu=cal_opt(tuk1,tuk2,tuk3,tuk4,' TukTuk ')
    x_ca=cal_opt(car1,car2,car3,car4,' Car ')
    
    final_dict=dict(list(x_bk.items())+list(x_tu.items())+list(x_ca.items()))
    

elif wthr == 'Rainy':
    Orb1.crt += 0.2*Orb1.crt
    Orb1.crt += 0.2*Orb1.crt
    
    x_tu=cal_opt(tuk1,tuk2,tuk3,tuk4,' TukTuk ')
    x_ca=cal_opt(car1,car2,car3,car4,' Car ')
    
    final_dict=dict(list(x_tu.items())+list(x_ca.items()))

else:
    x_bk=cal_opt(bke1,bke2,bke3,bke4,' Bike ')
    x_ca=cal_opt(car1,car2,car3,car4,' Car ')
    
    final_dict=dict(list(x_bk.items())+list(x_ca.items()))

result = min(final_dict,key=final_dict.get)
result = result.split(' ')

if result[0]=='Orbit3':
    print('Vehicle {0} to RK Puram via Orbit3 and Hallitharam via {1}'.format(result[1],result[2]))
else:
    print('Vehicle {0} to Hallitharam via {1} and RK Puram via {2}'.format(result[1],result[0],result[2]))

