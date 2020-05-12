#!/bin/bash

source components.conf

declare -a componentsList=()

export SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

for componentConf in $COMPONENTS; do

    IFS='|'
    read -a componentParts <<< "$componentConf"
    export component=${componentParts[0]}
    export version=${componentParts[1]}

    if [[ $component == *"-"* ]]; then            
        IFS='-'
        read -a parts <<< "$component"
        export componentRelativePath="../Packages/${parts[0]}/${parts[1]}"
    else
        export componentRelativePath="../Packages/$component"
    fi

    echo "$component : $version"

    if [ -f "$componentRelativePath/$component-$version.tgz" ]; then
        echo "No update"        
        #echo "Copying pre-built $component package version $version from path $componentRelativePath"
        #cp "$componentRelativePath/$component-$version.tgz" "./packages/$component-$version.tgz"
    else
        echo "Building $component in path $componentRelativePath"
        cd "$componentRelativePath"
        npm install && npm run build && npm pack
        cd $SCRIPTPATH
        
        cp "$componentRelativePath/$component-$version.tgz" "./packages/$component-$version.tgz"

        echo "Installing component: $component"
    
        rm -rf "node_modules/$component"
        npm install "./packages/$component-$version.tgz"
    fi
done
