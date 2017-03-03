set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 REPLY
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # commit
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"

  # publish
  echo "npm publish ..."
  npm publish
  echo
  echo "git push ..."
  git push
  echo
fi
