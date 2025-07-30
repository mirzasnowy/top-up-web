import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck } from "lucide-react";

export default function TransactionStatus() {
  return (
    <Layout>
      <div className="min-h-screen py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <ClipboardCheck className="w-8 h-8 text-snowy-500" />
              <span className="text-sm font-semibold text-snowy-600 uppercase tracking-wide">
                Lacak Pesanan
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Cek Status Transaksi
            </h1>
            <p className="text-lg text-muted-foreground">
              Masukkan ID Transaksi untuk melihat status pesananmu.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Lacak Pesanan Anda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="transactionId">ID Transaksi</Label>
                  <Input
                    id="transactionId"
                    placeholder="Contoh: SNW123456789"
                    className="mt-1"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-snowy-500 to-ice-500 hover:from-snowy-600 hover:to-ice-600 text-white">
                  Lacak Sekarang
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
