import { NextResponse } from 'next/server';

export async function POST() {
    // Pada arsitektur Stateless JWT, server tidak menyimpan state token.
    // Logout sepenuhnya merupakan urusan sisi klien (menghapus token dari localStorage/cookies).
    // Namun untuk memenuhi persyaratan endpoint API, kita sediakan route ini
    // yang mengembalikan response sukses agar klien tahu bahwa instruksi logout diterima.

    // (Dalam aplikasi produksi nyata, kita bisa mengimplementasikan JWT Blacklist ke database di sini
    // untuk meng-invalidasi token secara paksa sebelum kedaluwarsa).

    return NextResponse.json({
        success: true,
        message: 'Successfully logged out. Please remove token from local storage on client.'
    });
}
