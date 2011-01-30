#! /bin/bash
# post-commit hook to create git file directory for node subdomain 
SECRETKEY=GitCanRestartAllTheApps2011
# cd ..
gitdirsuffix=${PWD##*/}
gitdir=${gitdirsuffix%.git}

if [ -d "../$gitdir" ]; then
  cd ../$gitdir;
  unset GIT_DIR;
  git pull;
else
  git clone . ../$gitdir/;
  cd ../$gitdir;
fi;

# kill and restart the app
cd ../$gitdir/;
P=`cat .app.pid`;
kill ${P};
sleep 1;
curl "http://127.0.0.1:4001/app_restart?repo_id=${gitdir}&restart_key=${SECRETKEY}" >/dev/null 2>&1
