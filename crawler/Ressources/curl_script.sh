file="urls"

if [ -f "$file" ]; then
    while IFS= read -r url; do
        curl "$url" | grep flag >> test.txt
    done < "$file"
else
    echo "Le fichier $file n'existe pas."
fi