<?PHP

namespace Lib;

use Psr\Log\LoggerInterface;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\Printer;

class WPrinter {

    private $logger;

    const FACTURA = "01";
    const BOLETA = "03";
    const PRECUENTA = "PR";
    const TICKET = "TK";
    //
    const LINEA = "================================================\n";
    //
    private $ip = null;

    public function __construct(LoggerInterface $logger){
        $this->logger = $logger;
    }
    
    private function setIp($tipo){
        $this->ip = "192.168.0.31";
    }

    public function imprimir($tipo, $data = null){
        $this->setIp($tipo);
        if($tipo == WPrinter::PRECUENTA){
            $this->precuenta($data);
        }else if($tipo == WPrinter::BOLETA){
            
        }

    }

    private function precuenta($data){
        //$connector = new NetworkPrintConnector($this->ip, 9100);
        $connector = new FilePrintConnector("php://stdout");
        $printer = new Printer($connector);
        try {
            $printer->setFont(Printer::FONT_A); // Printer::FONT_B
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("* * * P R E C U E N T A * * *\n");
            $printer->text("{NOMBRE_COMERCIAL}\n");
            $printer->text("{RAZON_SOCIAL}\n");
            $printer->text("{DIRECCION}\n");
            if(true){
                $printer->text("{RAPPI}\n");
                $printer->text(WPrinter::LINEA);
            }
            $printer->setJustification(Printer::JUSTIFY_LEFT);
            $printer->text("FECHA HORA: " . date('d-m-Y H:i') . "\n");
            $printer->text("MESA: {NUMERO_MESA} | MOZO: {NOMBRE_MOZO}\n");
            //$printer->feed();
            $printer->text(WPrinter::LINEA);
            $printer->text("CANT PRODUCTO                PRECIO        TOTAL\n");
            $printer->text(WPrinter::LINEA);
            $printer->text("***1 PRODUCTO************* 1,000.00 1,000,000.00\n");
            $printer->text("***1 PRODUCTO************* 1,000.00 1,000,000.00\n");
            $printer->text("***1 PRODUCTO************* 1,000.00 1,000,000.00\n");
            $printer->text("***1 PRODUCTO************* 1,000.00 1,000,000.00\n");
            $printer->text("***1 PRODUCTO************* 1,000.00 1,000,000.00\n");
            $printer->text(WPrinter::LINEA);

            //$printer->barcode("CACHUDO");
            //$printer->qrCode("CACHUDO", Printer::QR_ECLEVEL_L, 7);
            
            $printer->cut();
        } finally {
            $printer->close();
        }
    }

}

?>