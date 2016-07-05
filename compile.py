#!/usr/bin/env python

import os, json, fileinput
from pprint import pprint

def usage(code, msg=''):
    print 'Compiles sw.js using mediamap.json'
    if msg:
        print >> sys.stderr, msg
    sys.exit(code)

def flatten(list_to_flatten):
    for elem in list_to_flatten:
        if isinstance(elem,(list, tuple)):
            for x in flatten(elem):
                return x
        else:
            return elem

if __name__ == "__main__":
    # Get current folder
    pwd = os.getcwd()
    
    # Open the json file.
    with open('mediamap.json') as data_file:    
        data = json.load(data_file)

    # Traverse array.
    list = [];
    d = data['language'];
    for lang in d:
        for voice in d[lang]:
            for person in d[lang][voice]:
                for letter in d[lang][voice][person]:
                    for a in d[lang][voice][person][letter]:
                        line = ''
                        file = './sounds/%s/%s/%s' % (lang,person,a['spoken'])
                        if os.path.exists(file):
                            line = '%s\n\'%s\',' % (line, file)
                        file = './sounds/effects/%s' % (a['effect'])
                        if os.path.exists(file):
                            line = '%s\n\'%s\',' % (line, file)
                        file = './images/pictures/%s' % (a['picture'])
                        if os.path.exists(file):
                            line = '%s\n\'%s\',' % (line, file)
                        if line not in list:
                            list.append(line)
    list = ''.join(list)

    # Replace placeholder and generate sw.js
    f = open('sw.template.js','r')
    filedata = f.read()
    f.close()

    newdata = filedata.replace("/*items-placeholder*/", list)

    f = open('sw.js','w')
    f.write(newdata)
    f.close()
