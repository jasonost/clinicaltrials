#!/usr/bin/env python
# -*- coding: utf-8 -*-

import codecs, os, re

files = os.listdir('.')

def create_breaks(data):
    return [d.replace('AEIOUAEIOU','<br />').replace('AEIOU',' ') for d in data]

for f in files:
    if f[-3:] == 'txt':
        curfile = codecs.open(f,'r','utf-8')
        outfile = codecs.open('temp.txt','w','utf-8')
        header = True
        rowcount = 0
        towrite = []
        for row in curfile.readlines():
            if header:
                numfields = len(row.strip().split('|'))
                header = False
            else:
                # read in this row
                thisrow = row.strip().split('|')
                # AEIOU is a placeholder for line breaks...
                thisrow = [re.sub('^ +| +$','',re.sub(' +',' ',c.replace('\r','').replace('\n','AEIOU').replace(u'\u2028','').replace('\\',' '))) for c in thisrow]
                # append to the last list in towrite
                if len(towrite) == 0:
                    towrite.append(thisrow)
                    newrow = thisrow[:]
                else:
                    lastrow = towrite[0]
                    newrow = lastrow[:-1] + [lastrow[-1] + 'AEIOU' + thisrow[0]] + thisrow[1:]
                # if the newrow is the too long, write out the existing element and replace with new row
                if len(newrow) > numfields:
                    outfile.write('|'.join(create_breaks(towrite[0])) + '\n')
                    rowcount += 1
                    towrite[0] = thisrow[:]
                # otherwise replace existing element with newrow
                else:
                    towrite = []
                    towrite.append(newrow[:])
                    towrite.append(thisrow)
        if len(towrite[0]) > numfields:
            outfile.write('|'.join(create_breaks(towrite[1])) + '\n')
            rowcount += 1
        elif len(towrite[0]) == numfields:
            outfile.write('|'.join(create_breaks(towrite[0])) + '\n')
            rowcount += 1
        print f, rowcount
        curfile.close()
        outfile.close()
        os.rename('temp.txt', f)
