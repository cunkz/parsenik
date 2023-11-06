
# Parse NIK

Javascript Library yang memudahkan untuk melakukan parse dan validasi data beserta tanggal atas sebuah Nomor Induk Kependudukan (NIK) KTP


## ⭐ Fitur

Parse NIK memiliki beberapa fungsi yang dapat digunakan sbb :
  
| Fungsi | Deskripsi  |
|--|--|
| isValid() | mengembalikan hasil dalam bentuk boolean atas validasi NIK |
| parse() | mengembalikan hasil dalam bentuk object atas validasi NIK dengan tambahan data seperti jenis kelamin, tanggal lahir, provinsi, kabupaten / kota, kecamatan dan kodepos |

Parse NIK juga memiliki beberapa pesan error sbb :

| Pesan Error |
|--|
| NIK harus dalam bentuk angka |
| Jumlah karakter NIK tidak sesuai |
| Tanggal Lahir tidak sesuai |
| Wilayah tidak ditemukan |


## 🔧 Cara Install

Jalankan perintah pada terminal :

```
npm i parsenik
```
  
Tambahkan kode baris berikut lalu jalankan aplikasi NodeJS :

```
const parsenik = require("parsenik");
const nik = 3329091003780012;
const hasil = parsenik.parse(nik);
console.log(hasil);
```
  
Contoh Hasil :

```
{
    "nik": 3329091003780012,
    "valid": true,
    "jenis_kelamin": "LAKI-LAKI",
    "tanggal_lahir": "1978-03-10",
    "provinsi": "JAWA TENGAH",
    "kabupaten_kota": "KAB. BREBES",
    "kecamatan": "BREBES",
    "kodepos": "52216"
}
```

## 🥔 Link Referensi
  
Library berikut dibuat dengan bantuan beberapa referensi sbb :

[https://disdukcapil.pontianakkota.go.id/page/nomor-induk-kependudukan](https://disdukcapil.pontianakkota.go.id/page/nomor-induk-kependudukan)

[https://sig.bps.go.id/bridging-kode/index](https://sig.bps.go.id/bridging-kode/index)
