set -e
echo "Enter release version: "
read VERSION

echo "Enter message of change:"
read MESSAGE

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 REPLY
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."
  export SAUCE_BUILD_ID=$VERSION:`date +"%s"`

  VERSION=$VERSION

  npm version $VERSION --message "[release] $VERSION"
  echo

  # publish
  echo "npm publish ..."
  npm publish
  echo
fi
