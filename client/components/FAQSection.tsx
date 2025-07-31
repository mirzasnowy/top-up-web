import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Bagaimana cara top up game di Snowy Store?",
    answer: "Pilih game yang ingin Anda top up, masukkan ID atau username game Anda, pilih nominal top up, pilih metode pembayaran, lalu selesaikan pembayaran. Diamond/item akan otomatis masuk ke akun Anda.",
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer: "Kami menerima berbagai metode pembayaran seperti transfer bank (BCA, Mandiri, BRI), e-wallet (Gopay, OVO, Dana, LinkAja), dan QRIS.",
  },
  {
    question: "Berapa lama proses top up?",
    answer: "Proses top up di Snowy Store sangat cepat, biasanya hanya dalam hitungan detik setelah pembayaran terverifikasi. Anda bisa cek status transaksi di halaman Status Transaksi.",
  },
  {
    question: "Apakah Snowy Store aman dan terpercaya?",
    answer: "Ya, Snowy Store adalah platform top up game yang aman dan terpercaya. Kami menggunakan sistem keamanan terkini untuk melindungi data dan transaksi Anda.",
  },
  {
    question: "Bagaimana jika ada masalah dengan transaksi saya?",
    answer: "Jika Anda mengalami masalah dengan transaksi, segera hubungi tim support kami melalui email atau WhatsApp yang tertera di halaman Kontak. Kami siap membantu 24/7.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-montserrat text-3xl lg:text-4xl font-extrabold text-foreground mb-4 leading-tight">
            Pertanyaan Umum (FAQ)
          </h2>
          <p className="font-inter text-base text-muted-foreground leading-relaxed">
            Temukan jawaban atas pertanyaan yang sering diajukan tentang layanan top up game kami.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border-b border-border">
                <AccordionTrigger className="font-inter text-lg text-foreground hover:text-primary transition-colors py-4 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-inter text-muted-foreground pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
