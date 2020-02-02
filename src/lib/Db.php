<?PHP

namespace Lib;

class Db extends SQLite3{

    private $logger;
    //
    private $location = __DIR__ . "/data.db";

    public function __construct(LoggerInterface $logger){
        $this->logger = $logger;
        $this->open($this->location);
    }

    public function store($rows){
        foreach($rows as $row){
            //$this->exec($row);
        }
    }

    public function query($sql){
        return $this->query($sql);
    }

    public function exec($sql){
        $this->exec($sql);
    }

    public function close(){
        $this->close();
    }

}

?>