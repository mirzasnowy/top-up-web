import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, Shield, Clock, Star, Check, GamepadIcon, CreditCard, Sparkles, Trophy, Diamond } from "lucide-react";

export default function GameTopUp() {
  const { gameId } = useParams();
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [gameUserId, setGameUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
          >
            <GamepadIcon className="w-16 h-16 mx-auto mb-4 text-purple-400" />
            <h1 className="text-3xl font-bold text-white mb-4">
              Game Tidak Ditemukan
            </h1>
            <p className="text-white/70 mb-6">Maaf, game yang Anda cari tidak tersedia</p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Button>
            </Link>
          </motion.div>
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
          quantity: 1,
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
      setPaymentDetails(data);
      console.log("Payment Details State:", data);
    } catch (error) {
      console.error("Error during Midtrans transaction:", error);
      alert("Terjadi kesalahan saat memproses pembayaran. Cek konsol untuk detail.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
        {/* Hero Section with Game Banner */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-20 pb-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <Link
                to="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-6 text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Link>
              
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 p-1">
                  <div className="w-full h-full rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center">
                    <GamepadIcon className="w-12 h-12 text-purple-600" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  Top Up {currentGame.name}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Isi {currentGame.currency} untuk {currentGame.name} dengan mudah, cepat, dan aman. 
                  Nikmati bonus eksklusif dan proses instan!
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="font-medium">100% Aman</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">Proses Instan</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Trophy className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Harga Terbaik</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pb-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* User ID Form */}
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg">
                      <GamepadIcon className="w-5 h-5 text-white" />
                    </div>
                    <span>Data Akun Game</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="userId" className="text-sm font-semibold flex items-center">
                        <Diamond className="w-4 h-4 mr-2 text-purple-500" />
                        User ID
                      </Label>
                      <Input
                        id="userId"
                        placeholder="Masukkan User ID"
                        value={gameUserId}
                        onChange={(e) => setGameUserId(e.target.value)}
                        className="h-12 border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500 rounded-xl bg-white/50 dark:bg-slate-900/50"
                      />
                    </div>
                    {currentGame.needsServer && (
                      <div className="space-y-2">
                        <Label htmlFor="serverId" className="text-sm font-semibold flex items-center">
                          <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                          Server ID
                        </Label>
                        <Input
                          id="serverId"
                          placeholder="Masukkan Server ID"
                          value={serverId}
                          onChange={(e) => setServerId(e.target.value)}
                          className="h-12 border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500 rounded-xl bg-white/50 dark:bg-slate-900/50"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName" className="text-sm font-semibold">Nama Lengkap</Label>
                      <Input
                        id="customerName"
                        placeholder="Masukkan Nama Lengkap"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="h-12 border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500 rounded-xl bg-white/50 dark:bg-slate-900/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerPhone" className="text-sm font-semibold">Nomor Telepon</Label>
                      <Input
                        id="customerPhone"
                        type="tel"
                        placeholder="Masukkan Nomor Telepon"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="h-12 border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500 rounded-xl bg-white/50 dark:bg-slate-900/50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="customerEmail" className="text-sm font-semibold">Email</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      placeholder="Masukkan Email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="h-12 border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500 rounded-xl bg-white/50 dark:bg-slate-900/50"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Package Selection */}
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <span>Pilih Nominal {currentGame.currency}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentGame.packages.map((pkg) => (
                      <motion.div
                        key={pkg.id}
                        whileHover={{ scale: 1.03, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedPackage === pkg.id
                            ? "border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 shadow-lg shadow-purple-500/25"
                            : "border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:border-purple-300 hover:shadow-lg"
                        }`}
                        onClick={() => setSelectedPackage(pkg.id)}
                      >
                        {pkg.popular && (
                          <div className="absolute -top-3 -right-3">
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
                              <Sparkles className="w-3 h-3 mr-1" />
                              POPULER
                            </Badge>
                          </div>
                        )}
                        
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                            <Diamond className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                            {pkg.amount}
                          </div>
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                            {pkg.price}
                          </div>
                          {pkg.bonus && (
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Bonus: {pkg.bonus}
                            </div>
                          )}
                        </div>
                        
                        {selectedPackage === pkg.id && (
                          <div className="absolute top-3 left-3">
                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-0 shadow-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <span>Metode Pembayaran</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-700 dark:text-slate-300">QRIS - Scan & Pay</h3>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedPaymentMethod === "qris"
                          ? "border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 shadow-lg"
                          : "border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:border-purple-300"
                      }`}
                      onClick={() => setSelectedPaymentMethod("qris")}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-3 flex items-center justify-center">
                          <img
                            src="/ic_qris.png"
                            alt="QRIS"
                            className="w-8 h-8 object-contain filter brightness-0 invert"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-lg text-slate-800 dark:text-slate-200">QRIS</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Scan QR code dengan aplikasi e-wallet favorit Anda
                          </p>
                        </div>
                        {selectedPaymentMethod === "qris" && (
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-700 dark:text-slate-300">E-Wallet</h3>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedPaymentMethod === "gopay"
                          ? "border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 shadow-lg"
                          : "border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:border-purple-300"
                      }`}
                      onClick={() => setSelectedPaymentMethod("gopay")}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 p-3 flex items-center justify-center">
                          <img
                            src="/ic_gopay.png"
                            alt="GoPay"
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-lg text-slate-800 dark:text-slate-200">GoPay</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Bayar langsung dengan saldo GoPay Anda
                          </p>
                        </div>
                        {selectedPaymentMethod === "gopay" && (
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Summary Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-24 border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                  <CardTitle className="text-xl font-bold flex items-center">
                    <Trophy className="w-6 h-6 mr-3" />
                    Ringkasan Pesanan
                  </CardTitle>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="text-slate-600 dark:text-slate-400">Game:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{currentGame.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="text-slate-600 dark:text-slate-400">User ID:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{gameUserId || "-"}</span>
                    </div>
                    {currentGame.needsServer && (
                      <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-slate-600 dark:text-slate-400">Server:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{serverId || "-"}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="text-slate-600 dark:text-slate-400">Nominal:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {selectedPackage
                          ? currentGame.packages.find((p) => p.id === selectedPackage)?.amount
                          : "-"}
                      </span>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 p-4 rounded-xl">
                      <div className="flex justify-between items-center font-bold text-lg text-slate-800 dark:text-slate-200">
                        <span>Total Pembayaran:</span>
                        <span className="text-purple-600 dark:text-purple-400">
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
                    className="w-full h-12 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1"
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
                    <Zap className="w-5 h-5 mr-3" />
                    Bayar Sekarang
                  </Button>

                  {/* Features */}
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
                    <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
                      <Shield className="w-5 h-5 text-green-500" />
                      <span>Transaksi 100% Aman & Terpercaya</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span>Proses Top Up Instan dalam Hitungan Detik</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span>Harga Paling Kompetitif di Pasar</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {paymentDetails && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
                  <CardTitle className="text-xl font-bold flex items-center">
                    <Check className="w-6 h-6 mr-3" />
                    Instruksi Pembayaran
                  </CardTitle>
                </div>
                <CardContent className="p-6 space-y-6">
                  {paymentDetails.payment_type === 'qris' && paymentDetails.actions && (
                    <div className="text-center space-y-4">
                      <p className="text-xl font-semibold text-slate-800 dark:text-slate-200">Scan QRIS untuk Pembayaran</p>
                      {paymentDetails.actions.map((action: any) => (
                        action.name === 'generate-qr-code' && (
                          <motion.img
                            key={action.url}
                            src={action.url}
                            alt="QR Code"
                            className="mx-auto w-64 h-64 rounded-lg shadow-lg border-4 border-slate-100 dark:border-slate-700"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          />
                        )
                      ))}
                      <p className="text-base text-slate-600 dark:text-slate-400">
                        Buka aplikasi e-wallet atau mobile banking Anda dan scan QR Code di atas untuk menyelesaikan pembayaran.
                      </p>
                    </div>
                  )}
                  {paymentDetails.payment_type === 'gopay' && paymentDetails.actions && (
                    <div className="text-center space-y-4">
                      <p className="text-xl font-semibold text-slate-800 dark:text-slate-200">Selesaikan Pembayaran dengan GoPay</p>
                      {paymentDetails.actions.find((action: any) => action.name === 'deeplink-redirect') ? (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Button asChild className="w-full max-w-sm mx-auto h-12 text-lg font-bold bg-gradient-to-r from-green-500 to-lime-600 hover:from-green-600 hover:to-lime-700 text-white rounded-xl shadow-lg">
                            <a href={paymentDetails.actions.find((action: any) => action.name === 'deeplink-redirect').url} target="_blank" rel="noopener noreferrer">
                              <img src="/ic_gopay.png" alt="GoPay Icon" className="w-6 h-6 mr-2" />
                              Buka Aplikasi Gojek
                            </a>
                          </Button>
                        </motion.div>
                      ) : (
                        <p className="text-base text-slate-600 dark:text-slate-400">Instruksi pembayaran GoPay tidak tersedia. Mohon coba metode lain.</p>
                      )}
                      <p className="text-base text-slate-600 dark:text-slate-400">
                        Klik tombol di atas untuk membuka aplikasi Gojek dan menyelesaikan pembayaran Anda.
                      </p>
                    </div>
                  )}
                  {paymentDetails.payment_type === 'bank_transfer' && paymentDetails.va_numbers && (
                    <div className="space-y-4">
                      <p className="text-xl font-semibold text-slate-800 dark:text-slate-200 text-center">Transfer Bank Virtual Account</p>
                      <div className="space-y-3">
                        {paymentDetails.va_numbers.map((va: any) => (
                          <motion.div
                            key={va.bank}
                            className="flex flex-col sm:flex-row justify-between items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <span className="font-medium text-lg text-slate-700 dark:text-slate-300 mb-2 sm:mb-0">{va.bank.toUpperCase()}</span>
                            <div className="flex items-center space-x-3">
                              <span className="font-bold text-xl text-purple-600 dark:text-purple-400">{va.va_number}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigator.clipboard.writeText(va.va_number)}
                                className="text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
                              >
                                Copy
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-base text-slate-600 dark:text-slate-400 text-center">
                        Lakukan transfer ke Virtual Account di atas. Pastikan jumlah pembayaran sesuai dengan total yang tertera.
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 text-center space-y-3">
                    <p className="text-base text-slate-600 dark:text-slate-400">Order ID: <span className="font-semibold text-slate-800 dark:text-slate-200">{paymentDetails.transaction_id}</span></p>
                    <p className="text-base text-slate-600 dark:text-slate-400">Total Pembayaran: <span className="font-semibold text-xl text-purple-600 dark:text-purple-400">Rp {paymentDetails.gross_amount ? parseFloat(paymentDetails.gross_amount).toLocaleString('id-ID') : 'N/A'}</span></p>
                    <Link to="/transaction-status" className="inline-block">
                      <Button className="mt-4 h-12 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <Clock className="w-5 h-5 mr-3" />
                        Lihat Status Transaksi
                      </Button>
                    </Link>
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