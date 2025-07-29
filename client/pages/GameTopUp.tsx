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

  // Mock game data - in real app this would come from API
  const gameData = {
    "mobile-legends": {
      name: "Mobile Legends",
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

  const handleTopUp = () => {
    if (
      !selectedPackage ||
      !gameUserId ||
      (currentGame.needsServer && !serverId)
    ) {
      alert("Mohon lengkapi semua field yang diperlukan");
      return;
    }

    const selectedPkg = currentGame.packages.find(
      (pkg) => pkg.id === selectedPackage,
    );
    alert(
      `Top up berhasil diproses!\nGame: ${currentGame.name}\nPaket: ${selectedPkg?.amount}\nHarga: ${selectedPkg?.price}`,
    );
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
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
                      (currentGame.needsServer && !serverId)
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
        </div>
      </div>
    </Layout>
  );
}
