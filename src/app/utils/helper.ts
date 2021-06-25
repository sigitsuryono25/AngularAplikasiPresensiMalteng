declare var $: any;
const funcs = {
  toRad(number: any) {
    return number * Math.PI / 180
  },
  haversineFormula(lat1: any, lon1: any, lat2: any, lon2: any) {
    var R = 6371000;
    var x1 = lat2 - lat1;
    var dLat = this.toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = this.toRad(x2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  },
  sendLoading(element: string = "body", message: string = "Mengirimkan Data..") {
    $(element).loading({
      message: message,
    })
  },
  showLoadingData(element: string = "body") {
    $(element).loading();
  },
  hideLoadingData(element: string = "body") {
    $(element).loading("stop");
  },
  scrolltoid(id: string) {
    $('html, body').animate({
      scrollTop: $("#" + id).offset().top
    }, 2000);
  },

  splitTanggal(tanggal: string, splitter: any = "/", newSplitter: any = "-"): string {
    let s = tanggal.split(splitter);
    return s[2] + newSplitter + s[1] + newSplitter + s[0];
  },
  bulanIndonesia(index: number): string {
    var bulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    return bulan[index - 1];
  },
  printDiv(id: any) {
    var printContents = document.getElementById(id)?.innerHTML;
    let content = `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="Description" content="Enter your description here"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css">
        </head>
        <body>
        <div class="container">
        `+ printContents +
      `
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.1/umd/popper.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </body>
        </html>`;
    let params = 'width=' + screen.width;
    params += ', height=' + screen.height;
    params += ', top=0, left=0'
    params += ', fullscreen=yes';
    let myWindow = window.open('', "windowlabarugi", params);
    myWindow?.document.write(content as string);


    // myWindow?.document.close(); //missing code


    myWindow?.focus();
    setTimeout(function () {
      myWindow?.print();
      myWindow?.close();
    }, 1000);

  }
}

export default funcs;
