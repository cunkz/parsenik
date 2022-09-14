// const dayjs = require("dayjs");
const moment = require("moment");
const source = require("./source.json");

/**
 * Olah nik untuk mengetahui apakah valid atau tidak
 *
 * @param {number} nik
 * @return {boolean}
 * @private
 */

function isValid (nik) {
  const result = parse(nik);
  return result.valid;
}

/**
 * Olah nik sehingga menghasilkan nilai valid, jenis kelamin, tanggal lahir, provinsi, kabupaten_kota, kecamatan, kodepos, kode unik
 *
 * @param {number} nik
 * @return {object}
 * @private
 */

function parse (nik) {
  let resp = {
    nik: nik,
    valid: true,
  };

  try {
    let data = {
      jenis_kelamin: "LAKI-LAKI",
      tanggal_lahir: "",
      provinsi: "",
      kabupaten_kota: "",
      kecamatan: "",
      kodepos: "",
    };
  
    const tmpNIK = nik.toString();
    if(typeof nik != "number") {
      throw new Error("NIK harus dalam bentuk angka");
    }
    if(tmpNIK.length != 16) {
      throw new Error("Jumlah karakter NIK tidak sesuai");
    }

    let tglLahir = tmpNIK.substring(6, 8);
    let blnLahir = tmpNIK.substring(8, 10);
    let thnLahir = tmpNIK.substring(10, 12);

    // proses pencarian jenis kelamin
    tglLahir > 40 && (data.jenis_kelamin = "PEREMPUAN");

    // proses pencarian tanggal lahir
    const curThn = new Date().getFullYear().toString().substring(-2);
    if(data.jenis_kelamin == "PEREMPUAN") {
      tglLahir -= 40;
      tglLahir = tglLahir.toString().length > 1 ? tglLahir : `0${tglLahir}`;
    }
    thnLahir = ( thnLahir < curThn ? `20${thnLahir}` :  `19${thnLahir}`);
    const tglLahirFull = `${thnLahir}-${blnLahir}-${tglLahir}`;
    if(!moment(tglLahirFull).isValid()) {
      throw new Error("Tanggal Lahir tidak sesuai");
    }
    data.tanggal_lahir = tglLahirFull;

    // proses pencarian wilayah
    const foundDistrict = source.some(prov =>
      prov.kabupaten_kota.some(kabkot =>
        kabkot.kecamatan.some(kec => {
            const check = kec.kode === tmpNIK.substring(0, 6);
            if(check) {
              data.provinsi = prov.nama;
              data.kabupaten_kota = kabkot.nama;
              data.kecamatan = kec.nama;
              data.kodepos = kec.kodepos;
            }
            return check;
          })));

    if(!foundDistrict) {
      throw new Error("Wilayah tidak ditemukan");
    };
    resp = {...resp, ...data};
  } catch (error) {
    resp.valid = false;
    resp.message = error.message;
  }
  
  return resp;
}

module.exports = {
  parse,
  isValid
};
