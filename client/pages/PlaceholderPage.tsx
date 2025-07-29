import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  iconComponent?: React.ComponentType<any>;
}

export default function PlaceholderPage({
  title,
  description,
  iconComponent: Icon = Construction,
}: PlaceholderPageProps) {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="w-24 h-24 mx-auto bg-snowy-100 dark:bg-snowy-800 rounded-full flex items-center justify-center">
              <Icon className="w-12 h-12 text-snowy-500" />
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Halaman ini sedang dalam pengembangan. Silakan kembali nanti
                atau hubungi kami untuk informasi lebih lanjut.
              </p>

              <Link to="/">
                <Button className="bg-gradient-to-r from-snowy-500 to-ice-500 hover:from-snowy-600 hover:to-ice-600 text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
