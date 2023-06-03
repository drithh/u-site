import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const organizationData = [
  {
    name: "BEM UNS",
    description:
      "Badan Eksekutif Mahasiswa Universitas Sebelas Maret adalah organisasi mahasiswa intra kampus yang merupakan lembaga eksekutif di tingkat universitas.",
    field: "Kepemimpinan",
    established: new Date("2003-02-25"),
    vision: "Visi BEM UNS",
    mission: "Misi BEM UNS",
  },
  {
    name: "DEMA UNS",
    description:
      "Dewan Mahasiswa Universitas Sebelas Maret lembaga perwakilan, tempat mahasiswa menyampaikan aspirasi dan menyuarakan kepentingannya. Lewat lembaga ini akan keluar kebijakan yang menjadi dasar bagi pimpinan universitas, presiden BEM dalam menjalankan roda pemerintahan, yang diwujudkan dalam bentuk undang-undang.",
    field: "Kepemimpinan",
    established: new Date("2000-07-10"),
    vision: "Visi DEMA UNS",
    mission: "Misi DEMA UNS",
  },
  {
    name: "BKKT UNS",
    description:
      "Badan Koordinasi Kesenian Tradisional Universitas Sebelas Maret merupakan wadah kegiatan mahasiswa UNS yang memiliki minat, bakat, dan keinginan untuk mengembangkan kesenian tradisional yang merupakan suatu perpaduan dari cipta, rasa dan karsa bangsa sendiri melalui komunikasi dan apresiasi seni. Seiring berjalannya waktu, BKKT UNS tidak selalu stagnan pada kesenian tradisional. BKKT UNS juga bergerak mengembangkan seni kontemporer namun tetap berpedoman pada seni tradisi Jawa. Hal tersebut dikarenakan BKKT UNS ingin tetap melestarikan budaya tradisional di Jawa Tengah pada umumnya dan di Solo pada khususnya.",
    field: "Kesenian",
    established: new Date("2002-09-15"),
    vision: "Visi BKKT UNS",
    mission: "Misi BKKT UNS",
  },
  {
    name: "VOCA ERUDITA UNS",
    description:
      "Paduan Suara Mahasiswa Voca Erudita Universitas Sebelas Maret (PSM Voca Erudita UNS) merupakan wadah kegiatan mahasiswa yang bergerak di bidang seni, khususnya seni paduan suara. PSM Voca Erudita UNS sendiri telah menjadi salah satu kebanggaan UNS dan kota Solo bahkan Indonesia. Dengan berbagai prestasi yang telah dicapai, Voca Erudita telah turut mengharumkan nama UNS, Kota Solo, dan Indonesia di kancah dunia. GALLERY VOCA ERUDITA UNIVERSITAS SEBELAS MARET",
    field: "Kesenian",
    established: new Date("2005-11-30"),
    vision: "Visi Voca Erudita UNS",
    mission: "Misi Voca Erudita UNS",
  },
  {
    name: "MARCHING BAND UNS",
    description:
      "Marching Band Universitas Sebelas Maret merupakan wadah kegiatan mahasiswa yang bergerak di bidang seni, khususnya seni musik. Kegiatan rutin yang dilakukan oleh Marching Band UNS adalah Perekrutan Anggota (Open Recruitment), DIKSAR Musik (Pelatihan Dasar Musik), LATAL (Latihan Alam), penyambutan mahasiswa baru, dan lain sebagainya.",
    field: "Kesenian",
    established: new Date("2004-04-17"),

    vision: "Visi Marching Band UNS",
    mission: "Misi Marching Band UNS",
  },
  {
    name: "KOPMA UNS",
    description:
      "Koperasi Mahasiswa Universitas Sebelas Maret merupakan salah satu Unit dari wadah kegiatan mahasiswa, dan satu–satunya yang memiliki kegiatan selain bergerak dalam bidang pengembangan sumber daya anggota juga secara langsung menangani unit usaha. Unit usaha didirikan atas dasar kepentingan bersama dari, oleh dan untuk anggota.",
    field: "Kewirausahaan",
    established: new Date("2001-12-05"),

    vision: "Visi KOPMA UNS",
    mission: "Misi KOPMA UNS",
  },
  {
    name: "PRAMUKA UNS",
    description:
      "Gerakan Pramuka Universitas Sebelas Maret Gudep Surakarta 04.555 & 04.550 memiliki sekretariat di gedung Grha UKM UNS. Kegiatan rutin tahunan yang sering dilaksanakan diantaranya menjadi Paskibraka saat HUT Kemerdekaan Republik Indonesia yang diselenggarakan di UNS. Selain itu, ada Latihan Pengembangan Kepemimpinan dan Manajemen (LPKM), Temu Karya Pramuka Penegak Surakarta (TKPPS) dan lainnya.",
    field: "Kepemimpinan",
    established: new Date("2003-08-20"),

    vision: "Visi Pramuka UNS",
    mission: "Misi Pramuka UNS",
  },
  {
    name: "KSR PMI UNS",
    description:
      "Korp Suka Rela Palang Merah Indonesia Universitas Sebelas Maret merupakan wadah kegiatan mahasiswa yang bergerak di bidang kepalangmerahan, sosial, kemanusiaan, dan pengabdian masyarakat. Program kerjanya, bukan hanya ditujukan untuk pengadian masyarakat, melainkan juga pengembangan kualitas anggota. Berbagai pelatihan baik tingkat intern, lokal maupun nasional diadakan sehingga dapat menciptakan relawan dengan kemampuan yang memadai serta memiliki jiwa sosial yang tinggi.",
    field: "Kemanusiaan",
    established: new Date("2000-03-12"),

    vision: "Visi KSR PMI UNS",
    mission: "Misi KSR PMI UNS",
  },
  {
    name: "JN UKMI UNS",
    description:
      "Jamaah Nurul Huda Unit Kegiatan Mahasiswa Islam Universitas Sebelas Maret sebagai wadah kegiatan mahasiswa dengan fokus kegiatan pada pengembangan kerohanian Islam. JN UKMI berkomitmen menjadi solusi dan menekan dekadensi moral anak bangsa. Visi JN UKMI, yakni: sebagai Lembaga Dakwah Kampus (LDK) Nasional dan fasilitator transformasi nilai-nilai Islam dalam rangkan membentuk lingkungan kampus dan civitas akademika yang berafiliasi terhadap Islam demi menyongsong Indonesia madani.",
    field: "Keagamaan",
    established: new Date("2001-06-28"),

    vision: "Visi JN UKMI UNS",
    mission: "Misi JN UKMI UNS",
  },
  {
    name: "PMK UNS",
    description:
      "Persekutuan Mahasiswa Kristen Universitas Sebelas Maret (PMK UNS) beranggotakan mahasiswa Kristen di UNS. PMK UNS menjadi wadah pembinaan rohani dan pelatihan bagi mahasiswa Kristen. Agenda rutin adalah Persekutuan Umum (Persekutuan Gabungan PMK-PMK se-UNS) dan Persekutuan Doa Pagi yang diadakan tiap Jumat.",
    field: "Keagamaan",
    established: new Date("2002-09-02"),

    vision: "Visi PMK UNS",
    mission: "Misi PMK UNS",
  },
  {
    name: "KMK UNS",
    description:
      "Keluarga Mahasiswa Katolik Universitas Sebelas Maret (KMK UNS) beranggotakan mahasiswa katolik di UNS. Pada level fakultas mahasiswa mendapat kegiatan pengalaman rohani, sedangkan kegiatan KMK UNS merupakan bentuk nyata ke masyarakat. Ikatan kekeluargaan di KMK bisa dikatakan besar. Hal itu tampak pada sollidaritas dan kearifan yang dikedepankan untuk setiap masalah yang terjadi.",
    field: "Keagamaan",
    established: new Date("2003-05-18"),

    vision: "Visi KMK UNS",
    mission: "Misi KMK UNS",
  },
  {
    name: "LPM KENTINGAN UNS",
    description:
      "Lembaga Pers Mahasiswa Kentingan Universitas Sebelas Maret mewadahi mahasiswa yang ingin menggeluti bidang penulisan (pers). Berdiri 21 Desember 1993, pers kampus ini aktif menerbitkan buletin, majalah dan media online sebagai bentuk kepedulian perkembangan informasi kampus.",
    field: "Keilmuan",
    established: new Date("2005-04-09"),

    vision: "Visi LPM KENTINGAN UNS",
    mission: "Misi LPM KENTINGAN UNS",
  },
  {
    name: "SIM UNS",
    description:
      "Studi Ilmiah Mahasiswa Universitas Sebelas Maret (SIM UNS) merupakan wadah kegiatan keilmiahan di UNS. SIM UNS merupakan ajang bagi mahasiswa untuk berperan sebagai agent of change melalui karya-karya yang bersifat inovatif, produktif, berfikir dengan analitis serta berkreatifitas dalam menyikapi setiap perubahan yang terjadi di masyarakat. Program Kerja SIM UNS antara lain, School of Science, Development, Festival Ilmiah, Sosialisasi PKM dan sebagainya.",
    field: "Keilmuan",
    established: new Date("2001-08-14"),

    vision: "Visi SIM UNS",
    mission: "Misi SIM UNS",
  },
  {
    name: "KMS UNS",
    description:
      "Korps Mahasiswa Siaga Universitas Sebelas Maret, bahwa eksistensinya sangat diperlukan sebagai komponen cadangan rakyat terlatih. Berbagai upaya dilakukan untuk mereposisi tugas dan fungsinya agar sejalan dengan dinamika perguruan tinggi. KMS UNS adalah reorganisasi Resimen Mahasiswa (MENWA) yang secara nyata menampung minat dan bakat mahasiswa di bidang bela negara dan berbakti kepada masyarakat dan bangsa sebagai manifestasi Tri Dharma Perguruan Tinggi.",
    field: "Kepemimpinan",
    established: new Date("2001-09-25"),

    vision: "Visi KMS UNS",
    mission: "Misi KMS UNS",
  },
  {
    name: "GWB UNS",
    description:
      "Garba Wira Bhuana Universitas Sebelas Maret merupakan organisasi pecinta alam yang telah berdiri cukup lama di lingkungan UNS, yaitu semenjak tahun 1977. Organisasi ini bertujuan untuk menjaga, memelihara dan mencintai alam semesta beserta isinya. Kegiatan sosial dan budaya termasuk juga dalam agenda GWB selain kepecintaalaman (mountaineering, caving, rock climbing, rafting, lingkungan hidup dan lain-lain).",
    field: "Kepemimpinan",
    established: new Date("2000-01-01"),

    vision: "Visi GWB UNS",
    mission: "Misi GWB UNS",
  },
  {
    name: "TAEKWONDO UNS",
    description:
      "Taekwondo Universitas Sebelas Maret merupakan olahraga beladiri modern yang berakar dari tradisional Korea. UKM ini memiliki visi mengembangkan olahraga beladiri Taekwondo, khususnya di lingkungan UNS. Mewadahi kreatifitas pengembangan potensi diri dalam hal keorganisasian menjadi salah satu misinya.",
    field: "Olahraga",
    established: new Date("2003-11-11"),

    vision: "Visi Taekwondo UNS",
    mission: "Misi Taekwondo UNS",
  },
  {
    name: "TAPAK SUCI UNS",
    description:
      "Tapak Suci Universitas Sebelas Maret adalah organisasi kemahasiswaan tingkat universitas yang mewadahi minat dan bakat mahasiswa dalam bidang olahraga beladiri.",
    field: "Olahraga",
    established: new Date("2003-01-01"),

    vision: "Visi Tapak Suci",
    mission: "Misi Tapak Suci",
  },

  {
    name: "PERISAI DIRI UNS",
    description:
      "Perisai Diri Universitas Sebelas Maret merupakan wadah olahraga beladiri yang tergabung dalam Keluarga Silat Nasional Indonesia Perisai Diri atau lebih akrab disebut dengan Perisai Diri adalah salah satu UKM di UNS yang berbentuk seni beladiri.",
    field: "Olahraga",
    established: new Date("2004-05-01"),

    vision: "Visi Perisai Diri",
    mission: "Misi Perisai Diri",
  },
  {
    name: "MP UNS",
    description:
      "Merpati Putih Universitas Sebelas Maret merupakan salah satu perguruan pencak silat beladiri tangan kosong (betako). Arti dari merpati putih itu sendiri adalah singkatan dalam bahasa Jawa, yaitu Patitising Tindak Pusakane Titising Hening, yang artinya “Mencari sampai mendapat kebenaran dalam ketengangan.”",
    field: "Olahraga",
    established: new Date("2002-03-01"),

    vision: "Visi MP",
    mission: "Misi MP",
  },
  {
    name: "PSHT UNS",
    description:
      "Persaudaraan Setia Hati Teratai Universitas Sebelas Maret merupakan wadah bagi mahasiswa yang ingin menekuni bidang pencak silat dan senantiasa berusaha mengembangkan serta mempertahankan pencak silat sebagai sebuah tradisi dan seni beladiri asli bangsa Indonesia.",
    field: "Olahraga",
    established: new Date("2001-12-01"),

    vision: "Visi PSHT",
    mission: "Misi PSHT",
  },
  {
    name: "INKAI UNS",
    description:
      "Merupakan salah satu UKM yang mewadahi salah satu cabang beladiri di UNS yaitu Karate. Seni beladiri dari Jepang yang berarti “tangan kosong",
    field: "Olahraga",
    established: new Date("2005-07-01"),

    vision: "Visi INKAI",
    mission: "Misi INKAI",
  },
];

const userData = [
  {
    name: "BEM UNS",
    email: "bemuns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "081234567890",
    address: "Alamat BEM UNS",
  },
  {
    name: "DEMA UNS",
    email: "demauns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "082345678901",
    address: "Alamat DEMA UNS",
  },
  {
    name: "BKKT UNS",
    email: "bkktuns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "083456789012",
    address: "Alamat BKKT UNS",
  },
  {
    name: "VOCA ERUDITA UNS",
    email: "vocaeruditauns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "084567890123",
    address: "Alamat VOCA ERUDITA UNS",
  },
  {
    name: "MARCHING BAND UNS",
    email: "marchingbanduns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "085678901234",
    address: "Alamat MARCHING BAND UNS",
  },
  {
    name: "KOPMA UNS",
    email: "kopmauns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "086789012345",
    address: "Alamat KOPMA UNS",
  },
  {
    name: "PRAMUKA UNS",
    email: "pramukauns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "087890123456",
    address: "Alamat PRAMUKA UNS",
  },
  {
    name: "KSR PMI UNS",
    email: "ksrpmiuns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "088901234567",
    address: "Alamat KSR PMI UNS",
  },
  {
    name: "JN UKMI UNS",
    email: "jnukmiuns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "089012345678",
    address: "Alamat JN UKMI UNS",
  },
  {
    name: "PMK UNS",
    email: "pmkuns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "090123456789",
    address: "Alamat PMK UNS",
  },
  {
    name: "KMK UNS",
    email: "kmkuns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "091234567890",
    address: "Alamat KMK UNS",
  },
  {
    name: "LPM KENTINGAN UNS",
    email: "lpmkentinganuns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "092345678901",
    address: "Alamat LPM KENTINGAN UNS",
  },
  {
    name: "SIM UNS",
    email: "simuns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "093456789012",
    address: "Alamat SIM UNS",
  },
  {
    name: "KMS UNS",
    email: "kmsuns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "094567890123",
    address: "Alamat KMS UNS",
  },
  {
    name: "GWB UNS",
    email: "gwbuns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "095678901234",
    address: "Alamat GWB UNS",
  },
  {
    name: "TAEKWONDO UNS",
    email: "taekwondouns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "096789012345",
    address: "Alamat TAEKWONDO UNS",
  },
  {
    name: "TAPAK SUCI UNS",
    email: "tapaksuciuns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "097890123456",
    address: "Alamat TAPAK SUCI UNS",
  },
  {
    name: "PERISAI DIRI UNS",
    email: "perisaidiriuns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "098901234567",
    address: "Alamat PERISAI DIRI UNS",
  },
  {
    name: "MP UNS",
    email: "mpuns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "099012345678",
    address: "Alamat MP UNS",
  },
  {
    name: "PSHT UNS",
    email: "pshtuns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "010123456789",
    address: "Alamat PSHT UNS",
  },
  {
    name: "INKAI UNS",
    email: "inkaiuns@gmail.com",
    password: "$2a$10$GVy2tzzM4bPy4SMQ6hDqDexMjNjwT/kynr0becK4qyQf6tysGzlJe",
    phoneNumber: "011234567890",
    address: "Alamat INKAI UNS",
  },
];

async function main() {
  // drop all data
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();

  await prisma.organization.createMany({
    data: organizationData,
  });

  const organizationId = await prisma.organization.findMany({
    select: {
      id: true,
    },
  });

  await prisma.user.createMany({
    data: userData.map((user, index) => {
      return {
        ...user,
        organizationId: organizationId[index]?.id,
      };
    }),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
