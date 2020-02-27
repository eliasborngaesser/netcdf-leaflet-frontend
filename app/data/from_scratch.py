#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
#=======================================================================
# name: nc.py
#
# category: python script
#
# description:
#   This is a sample program to read and write a netCDF file with
#   Python.
#
# reference:
#   http://unidata.github.io/netcdf4-python/
#
# author: M. Yoshimori (myoshimo AT ees.hokudai.ac.jp)
#=======================================================================

from netCDF4 import Dataset
from numpy import dtype
import sys, math

#-----------------
# read netCDF file
#-----------------

# open a netCDF file to read
filename = sys.path[0]+"/netcdf/BVOC_Mainz_IsoOff_2018-07-06_05.00.00.nc"
ncin = Dataset(filename, 'r', format='NETCDF4')

#global attr
locationLat= ncin.getncattr('LocationLatitude')
locationLong= ncin.getncattr('LocationLongitude')
pixelWidth = int(ncin.getncattr('SizeDX')[0])
pixelHeight = int(ncin.getncattr('SizeDY')[0])
# check netCDF file format
#print(ncin.file_format)

# get axis data
#print(ncin.dimensions.keys())
#print(ncin.dimensions['time'])
tin = ncin.variables['Time']
latitude = ncin.variables['GridsJ']
longitude = ncin.variables['GridsI']

# get length of axis data
#ntime = len(tin)
nlat = len(latitude)
nlon = len(longitude)

# print axis
#print(tin[:])
#print(latitude[:])
#print(longitude[:])

# get variables
#print(ncin.variables.keys())
#print(ncin.variables['t2m'])

# read data
vin = ncin.variables['TSurf']
#print(vin.long_name)
#print(vin.units)

#------------------
# write netCDF file
#------------------

def calculatePixelSize(latitude,pixelWidth,pixelHeight): #calculate Resolution in degrees when given resolution in meters
    r_earth = 6378.137  #radius of the earth in kilometer

    resX = (1/((2*math.pi/360) * r_earth * math.cos(latitude))) /1000* pixelWidth
    resY = (1 / ((2 * math.pi / 360) * r_earth)) / 1000 * pixelHeight#111 km / degree 
    return resX,resY

# open a netCDF file to write
ncout = Dataset(sys.path[0]+'/netcdf/testout.nc', 'w', format='NETCDF4')

# define axis size
ncout.createDimension('time', None)  # unlimited
ncout.createDimension('lat', nlat)
ncout.createDimension('lon', nlon)

# create time axis
time = ncout.createVariable('time', dtype('double').char, ('time',))
time.long_name = 'time'
time.units = 'hours since 1990-01-01 00:00:00'
time.calendar = 'standard'
time.axis = 'T'

# create latitude axis
lat = ncout.createVariable('lat', dtype('double').char, ('lat'))
lat.standard_name = 'latitude'
lat.long_name = 'latitude'
lat.units = 'degrees_north'
lat.axis = 'Y'

# create longitude axis
lon = ncout.createVariable('lon', dtype('double').char, ('lon'))
lon.standard_name = 'longitude'
lon.long_name = 'longitude'
lon.units = 'degrees_east'
lon.axis = 'X'

# create variable array
vout = ncout.createVariable('TSurf', dtype('double').char, ('time', 'lat', 'lon'))
vout.long_name = '2 metre temperature'
vout.units = 'K'

resX,resY =calculatePixelSize(locationLat,1,1)
# copy axis from original dataset
time[:] = tin[:]
lon[:] = longitude[:]*resX+locationLong
lat[:] = latitude[:]*resY+locationLat
vout[:] = vin[:]

# close files
ncin.close()
ncout.close()