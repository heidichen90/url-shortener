function copyUrl() { 
  const url = document.getElementById("shortenUrl"); 
  const elem = document.createElement("textarea"); elem.value = url.innerText;
  document.body.appendChild(elem); elem.select(); document.execCommand("copy");
  document.body.removeChild(elem); 
}