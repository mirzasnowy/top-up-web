import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Gamepad2, 
  User, 
  CreditCard, 
  ShoppingCart, 
  CheckCircle,
  ArrowRight,
  Search,
  Wallet,
  Shield
} from 'lucide-react';

export default function HowToTopUp() {
  const steps = [
    {
      id: 1,
      title: "Pilih Game dari Katalog",
      description: "Pilih game favorit kamu dari katalog game yang tersedia di halaman utama Snowy Store.",
      icon: Gamepad2,
      details: "Klik pada card game yang ingin kamu top up. Setiap game memiliki rating dan deskripsi untuk membantu pilihan kamu."
    },
    {
      id: 2,
      title: "Masukkan ID & Server",
      description: "Isi User ID dan Server ID game kamu dengan benar sesuai data akun game.",
      icon: User,
      details: "Pastikan ID yang dimasukkan benar. Untuk game yang memerlukan server, pilih server yang sesuai dengan akun kamu."
    },
    {
      id: 3,
      title: "Pilih Nominal Top Up",
      description: "Pilih paket nominal yang diinginkan. Tersedia berbagai pilihan dengan bonus menarik.",
      icon: CreditCard,
      details: "Paket dengan label 'POPULER' biasanya memberikan bonus terbaik. Perhatikan bonus yang diberikan pada setiap paket."
    },
    {
      id: 4,
      title: "Klik 'Bayar Sekarang'",
      description: "Review pesanan kamu di ringkasan, lalu klik tombol 'Bayar Sekarang' untuk lanjut ke pembayaran.",
      icon: ShoppingCart,
      details: "Pastikan semua data sudah benar sebelum melakukan pembayaran. Cek kembali User ID, Server, dan nominal yang dipilih."
    },
    {
      id: 5,
      title: "Pilih Metode Pembayaran",
      description: "Pilih metode pembayaran yang kamu inginkan: QRIS, Virtual Account, atau e-wallet.",
      icon: Wallet,
      details: "Setiap metode pembayaran memiliki instruksi yang berbeda. Ikuti panduan pembayaran yang muncul di layar."
    },
    {
      id: 6,
      title: "Selesaikan Pembayaran",
      description: "Lakukan pembayaran sesuai instruksi dan tunggu konfirmasi status transaksi sukses.",
      icon: CheckCircle,
      details: "Setelah pembayaran berhasil, item akan otomatis masuk ke akun game kamu dalam hitungan menit."
    }
  ];

  const tips = [
    {
      icon: Shield,
      title: "Tips Keamanan",
      content: "Selalu pastikan User ID dan Server ID yang dimasukkan benar untuk menghindari kesalahan pengiriman."
    },
    {
      icon: Search,
      title: "Cek Status Transaksi", 
      content: "Gunakan fitur 'Status Transaksi' untuk memantau progress pembayaran dan pengiriman item game."
    },
    {
      icon: CheckCircle,
      title: "Proses Cepat",
      content: "Top up biasanya diproses dalam 1-5 menit setelah pembayaran berhasil dikonfirmasi."
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Cara Top Up di Snowy Store
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ikuti panduan step-by-step berikut untuk melakukan top up game dengan mudah dan aman
            </p>
          </motion.div>

          {/* Steps */}
          <div className="space-y-8 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-snowy-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.id}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border-l-4 border-snowy-400">
                    <strong>Tips:</strong> {step.details}
                  </p>
                </div>

                {/* Icon */}
                <div className="flex-shrink-0">
                  <Card className="w-32 h-32 flex items-center justify-center bg-gradient-to-br from-snowy-50 to-purple-50 border-snowy-200">
                    <CardContent className="p-0">
                      <step.icon className="w-16 h-16 text-snowy-600" />
                    </CardContent>
                  </Card>
                </div>

                {/* Arrow (except last step) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center w-full">
                    <ArrowRight className="w-8 h-8 text-snowy-400 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-snowy-50 to-purple-50 rounded-2xl p-8 border border-snowy-200"
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
              Tips & Informasi Penting
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {tips.map((tip, index) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center space-y-3"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-snowy-500 to-purple-500 text-white rounded-full flex items-center justify-center mx-auto">
                    <tip.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-800">{tip.title}</h3>
                  <p className="text-sm text-gray-600">{tip.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Siap untuk Top Up?
            </h3>
            <p className="text-gray-600 mb-6">
              Pilih game favorit kamu dan mulai top up sekarang juga!
            </p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-snowy-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Gamepad2 className="w-5 h-5 mr-2" />
              Mulai Top Up
            </motion.a>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
