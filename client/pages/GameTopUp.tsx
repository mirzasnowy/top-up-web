import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, Shield, Clock, Star } from "lucide-react";

export default function GameTopUp() {
  const { gameId } = useParams();
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [gameUserId, setGameUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [paymentDetails, setPaymentDetails] = useState<any>(null); // To store payment instructions

  // Mock game data - in real app this would come from API
  const gameData = {
    "mobile-legends": {
      name: "Mobile Legends",
      artwork: "/ml_game.webp",
      currency: "Diamond",
      needsServer: true,
      packages: [
        {
          id: "1",
          amount: "86 Diamond",
          price: "Rp 20.000",
          bonus: "",
          popular: false,
        },
        {
          id: "2",
          amount: "172 Diamond",
          price: "Rp 40.000",
          bonus: "",
          popular: false,
        },
        {
          id: "3",
          amount: "257 Diamond",
          price: "Rp 59.000",
          bonus: "+15 Diamond",
          popular: true,
        },
        {
          id: "4",
          amount: "344 Diamond",
          price: "Rp 79.000",
          bonus: "+20 Diamond",
          popular: false,
        },
        {
          id: "5",
          amount: "429 Diamond",
          price: "Rp 99.000",
          bonus: "+25 Diamond",
          popular: true,
        },
        {
          id: "6",
          amount: "514 Diamond",
          price: "Rp 118.000",
          bonus: "+30 Diamond",
          popular: false,
        },
      ],
    },
    "pubg-mobile": {
      name: "PUBG Mobile",
      artwork: "/pubg_game.webp",
      currency: "UC",
      needsServer: false,
      packages: [
        {
          id: "1",
          amount: "60 UC",
          price: "Rp 15.000",
          bonus: "",
          popular: false,
        },
        {
          id: "2",
          amount: "325 UC",
          price: "Rp 75.000",
          bonus: "+25 UC",
          popular: true,
        },
        {
          id: "3",
          amount: "660 UC",
          price: "Rp 150.000",
          bonus: "+60 UC",
          popular: false,
        },
        {
          id: "4",
          amount: "1800 UC",
          price: "Rp 375.000",
          bonus: "+200 UC",
          popular: true,
        },
      ],
    },
    "free-fire": {
      name: "Free Fire",
      artwork: "/ff_game.webp",
      currency: "Diamond",
      needsServer: false,
      packages: [
        {
          id: "1",
          amount: "70 Diamond",
          price: "Rp 10.000",
          bonus: "",
          popular: false,
        },
        {
          id: "2",
          amount: "140 Diamond",
          price: "Rp 20.000",
          bonus: "",
          popular: false,
        },
        {
          id: "3",
          amount: "355 Diamond",
          price: "Rp 50.000",
          bonus: "+35 Diamond",
          popular: true,
        },
        {
          id: "4",
          amount: "720 Diamond",
          price: "Rp 100.000",
          bonus: "+80 Diamond",
          popular: false,
        },
      ],
    },
    "genshin-impact": {
      name: "Genshin Impact",
      artwork: "/genshin_game.jpg",
      currency: "Genesis Crystal",
      needsServer: true,
      packages: [
        {
          id: "1",
          amount: "60 Genesis Crystal",
          price: "Rp 16.000",
          bonus: "",
          popular: false,
        },
        {
          id: "2",
          amount: "300 Genesis Crystal",
          price: "Rp 79.000",
          bonus: "+30 Genesis Crystal",
          popular: true,
        },
      ],
    },
    valorant: {
      name: "Valorant",
      artwork: "/valorant_game.webp",
      currency: "Points",
      needsServer: false,
      packages: [
        {
          id: "1",
          amount: "125 Points",
          price: "Rp 15.000",
          bonus: "",
          popular: false,
        },
        {
          id: "2",
          amount: "420 Points",
          price: "Rp 50.000",
          bonus: "",
          popular: true,
        },
      ],
    },
    roblox: {
      name: "Roblox",
      artwork: "/roblox_game.jpg",
      currency: "Robux",
      needsServer: false,
      packages: [
        {
          id: "1",
          amount: "80 Robux",
          price: "Rp 16.000",
          bonus: "",
          popular: false,
        },
        {
          id: "2",
          amount: "400 Robux",
          price: "Rp 79.000",
          bonus: "",
          popular: true,
        },
      ],
    },
  };

  const currentGame = gameData[gameId as keyof typeof gameData];

  if (!currentGame) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Game Tidak Ditemukan
            </h1>
            <Link to="/">
              <Button>Kembali ke Beranda</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleTopUp = async () => {
    console.log("handleTopUp called.");
    if (
      !selectedPackage ||
      !gameUserId ||
      (currentGame.needsServer && !serverId) ||
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !selectedPaymentMethod
    ) {
      console.log("Validation failed: Not all fields are filled.");
      alert("Mohon lengkapi semua field yang diperlukan");
      return;
    }

    const selectedPkg = currentGame.packages.find(
      (pkg) => pkg.id === selectedPackage,
    );

    if (!selectedPkg) {
      console.log("Validation failed: Selected package not found.");
      alert("Paket tidak ditemukan");
      return;
    }

    // Parse price from 'Rp X.XXX' format to a number
    const price = parseFloat(selectedPkg.price.replace("Rp ", "").replace(/\./g, "").replace(",", "."));

    console.log("Parsed Price:", price);
    console.log("Sending to server:", {
      id: gameId,
      price: price,
      quantity: 1,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      payment_method: selectedPaymentMethod,
    });

    try {
      console.log("Attempting to create Midtrans transaction...");
      const response = await fetch("/api/midtrans/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: gameId,
          price: price,
          quantity: 1, // Assuming 1 quantity for now
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          payment_method: selectedPaymentMethod,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server responded with an error:", response.status, errorText);
        alert("Gagal membuat transaksi Midtrans. Silakan coba lagi. (Server Error)");
        return;
      }

      const data = await response.json();
      console.log("Midtrans Core API response:", data);
      setPaymentDetails(data); // Save the payment details to state
      console.log("Payment Details State:", data);

      setTimeout(() => {
      const paymentSection = document.querySelector('[data-payment-details]');
      if (paymentSection) {
        paymentSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    } catch (error) {
      console.error("Error during Midtrans transaction:", error);
      alert("Terjadi kesalahan saat memproses pembayaran. Cek konsol untuk detail.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center text-snowy-600 hover:text-snowy-700 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Link>
            <h1 className="text-3xl font-bold text-foreground">
              Top Up {currentGame.name}
            </h1>
            <p className="text-muted-foreground mt-2">
              Isi {currentGame.currency} untuk {currentGame.name} dengan mudah
              dan cepat
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* User ID Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-snowy-500" />
                    <span>Data Akun</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="userId">User ID</Label>
                    <Input
                      id="userId"
                      placeholder="Masukkan User ID"
                      value={gameUserId}
                      onChange={(e) => setGameUserId(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  {currentGame.needsServer && (
                    <div>
                      <Label htmlFor="serverId">Server ID</Label>
                      <Input
                        id="serverId"
                        placeholder="Masukkan Server ID"
                        value={serverId}
                        onChange={(e) => setServerId(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="customerName">Nama Lengkap</Label>
                    <Input
                      id="customerName"
                      placeholder="Masukkan Nama Lengkap"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      placeholder="Masukkan Email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Nomor Telepon</Label>
                    <Input
                      id="customerPhone"
                      type="tel"
                      placeholder="Masukkan Nomor Telepon"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Package Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-snowy-500" />
                    <span>Pilih Nominal {currentGame.currency}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentGame.packages.map((pkg) => (
                      <motion.div
                        key={pkg.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedPackage === pkg.id
                            ? "border-snowy-500 bg-snowy-50 dark:bg-snowy-900/50"
                            : "border-border hover:border-snowy-300"
                        }`}
                        onClick={() => setSelectedPackage(pkg.id)}
                      >
                        {pkg.popular && (
                          <Badge className="absolute -top-2 -right-2 bg-orange-500">
                            POPULER
                          </Badge>
                        )}
                        <div className="text-sm font-semibold text-foreground">
                          {pkg.amount}
                        </div>
                        <div className="text-lg font-bold text-snowy-600">
                          {pkg.price}
                        </div>
                        {pkg.bonus && (
                          <div className="text-xs text-green-600 font-medium">
                            Bonus: {pkg.bonus}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-snowy-500" />
                    <span>Metode Pembayaran</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">QRIS</h3>
                    <div
                      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPaymentMethod === "qris"
                          ? "border-snowy-500 bg-snowy-50 dark:bg-snowy-900/50"
                          : "border-border hover:border-snowy-300"
                      }`}
                      onClick={() => setSelectedPaymentMethod("qris")}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src="/ic_qris_dark.jpg"
                          alt="QRIS"
                          className="w-12 h-12"
                        />
                        <div>
                          <p className="font-semibold">QRIS</p>
                          <p className="text-sm text-muted-foreground">
                            Scan QR code dengan aplikasi e-wallet Anda.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">E-Wallet</h3>
                    <div
                      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPaymentMethod === "gopay"
                          ? "border-snowy-500 bg-snowy-50 dark:bg-snowy-900/50"
                          : "border-border hover:border-snowy-300"
                      }`}
                      onClick={() => setSelectedPaymentMethod("gopay")}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src="/ic_gopay_dark.webp"
                          alt="GoPay"
                          className="w-12 h-12"
                        />
                        <div>
                          <p className="font-semibold">GoPay</p>
                          <p className="text-sm text-muted-foreground">
                            Bayar dengan akun GoPay Anda.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Summary Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Game:</span>
                      <span className="font-medium">{currentGame.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>User ID:</span>
                      <span className="font-medium">{gameUserId || "-"}</span>
                    </div>
                    {currentGame.needsServer && (
                      <div className="flex justify-between text-sm">
                        <span>Server:</span>
                        <span className="font-medium">{serverId || "-"}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Nominal:</span>
                      <span className="font-medium">
                        {selectedPackage
                          ? currentGame.packages.find(
                              (p) => p.id === selectedPackage,
                            )?.amount
                          : "-"}
                      </span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-snowy-600">
                          {selectedPackage
                            ? currentGame.packages.find(
                                (p) => p.id === selectedPackage,
                              )?.price
                            : "Rp 0"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleTopUp}
                    className="w-full bg-gradient-to-r from-snowy-500 to-ice-500 hover:from-snowy-600 hover:to-ice-600 text-white"
                    disabled={
                      !selectedPackage ||
                      !gameUserId ||
                      (currentGame.needsServer && !serverId) ||
                      !customerName ||
                      !customerEmail ||
                      !customerPhone ||
                      !selectedPaymentMethod
                    }
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Bayar Sekarang
                  </Button>

                  {/* Features */}
                  <div className="mt-6 pt-6 border-t space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>100% Aman & Terpercaya</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>Proses Instan</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>Harga Terbaik</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {paymentDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Instruksi Pembayaran</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentDetails.payment_type === 'qris' && paymentDetails.actions && (
                    <div className="text-center">
                      <p className="text-lg font-semibold mb-2">Scan QRIS untuk Pembayaran</p>
                      {paymentDetails.actions.map((action: any) => (
                        action.name === 'generate-qr-code' && (
                          <img src={action.url} alt="QR Code" className="mx-auto w-48 h-48" />
                        )
                      ))}
                      <p className="text-sm text-muted-foreground mt-2">Buka aplikasi e-wallet Anda dan scan QR Code di atas.</p>
                    </div>
                  )}
                  {paymentDetails.payment_type === 'gopay' && paymentDetails.actions && (
                    <div className="text-center">
                      <p className="text-lg font-semibold mb-2">Selesaikan Pembayaran dengan GoPay</p>
                      {paymentDetails.actions.find((action: any) => action.name === 'deeplink-redirect') ? (
                        <Button asChild className="w-full max-w-xs mx-auto bg-blue-600 hover:bg-blue-700 text-white">
                          <a href={paymentDetails.actions.find((action: any) => action.name === 'deeplink-redirect').url} target="_blank" rel="noopener noreferrer">
                            Buka Aplikasi Gojek
                          </a>
                        </Button>
                      ) : (
                        <p>Instruksi pembayaran GoPay tidak tersedia.</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-2">Klik tombol di atas untuk membuka aplikasi Gojek dan menyelesaikan pembayaran.</p>
                    </div>
                  )}
                  {paymentDetails.payment_type === 'bank_transfer' && paymentDetails.va_numbers && (
                    <div>
                      <p className="text-lg font-semibold mb-2">Transfer Bank Virtual Account</p>
                      {paymentDetails.va_numbers.map((va: any) => (
                        <div key={va.bank} className="flex justify-between items-center py-2 border-b last:border-b-0">
                          <span className="font-medium">{va.bank.toUpperCase()}</span>
                          <span className="font-bold text-lg text-snowy-600">{va.va_number}</span>
                        </div>
                      ))}
                      <p className="text-sm text-muted-foreground mt-2">Lakukan transfer ke Virtual Account di atas. Pastikan jumlah sesuai.</p>
                    </div>
                  )}
                  {/* Add more payment type instructions as needed */}
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">Order ID: <span className="font-semibold">{paymentDetails.transaction_id}</span></p>
                    <p className="text-sm text-muted-foreground">Total Pembayaran: <span className="font-semibold">Rp {paymentDetails.gross_amount ? new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(paymentDetails.gross_amount) : 'N/A'}</span></p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
