vercel_local_env_file="./.env"
if ! [ -f $vercel_local_env_file ]; then
  touch $vercel_local_env_file
  truncate -s 0 $vercel_local_env_file
  echo "DATABASE_NAME=\"PLEASE_SPECIFY\"" >> $vercel_local_env_file
  echo "MONGODB_URI=\"PLEASE_SPECIFY\"" >> $vercel_local_env_file
  echo "NX_DAEMON=\"\"" >> $vercel_local_env_file
  echo "TURBO_REMOTE_ONLY=\"\"" >> $vercel_local_env_file
  echo "TURBO_RUN_SUMMARY=\"\"" >> $vercel_local_env_file
  echo "VERCEL=\"1\"" >> $vercel_local_env_file
  echo "VERCEL_ENV=\"development\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_COMMIT_AUTHOR_LOGIN=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_COMMIT_AUTHOR_NAME=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_COMMIT_MESSAGE=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_COMMIT_REF=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_COMMIT_SHA=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_PREVIOUS_SHA=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_PROVIDER=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_PULL_REQUEST_ID=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_REPO_ID=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_REPO_OWNER=\"\"" >> $vercel_local_env_file
  echo "VERCEL_GIT_REPO_SLUG=\"\"" >> $vercel_local_env_file
  echo "VERCEL_URL=\"\"" >> $vercel_local_env_file
fi