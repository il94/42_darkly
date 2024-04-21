file="urls"

# Vérifier si le fichier existe
if [ -f "$file" ]; then
    # Lire chaque ligne du fichier
    while IFS= read -r url; do
        # Exécuter curl pour chaque URL
        curl "$url"
    done < "$file"
else
    echo "Le fichier $file n'existe pas."
fi