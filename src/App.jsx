import { useState, useEffect, useRef } from "react";

const LWORDS = ["ADVERTS","BADGERS","BRAVEST","CRAFTED","DWARVES","STARVED","STEWARD",
    "WEBCAST","ADVERT","BADGER","BADGES","BAXTER","BEARDS","BRACED","BRACES","BRAVED",
    "BRAVES","BREADS","BREAST","CADETS","CARVED","CASTER","CATERS","CRAFTS","CRATES",
    "CRAVED","CRAVES","CRAZED","DRAFTS","DWARFS","EXTRAS","FACETS","FASTER","GRACED",
    "GRACES","GRADES","GRATED","GRAVES","GREATS","REACTS","SACRED","SCARED","STAGED",
    "STARED","STARVE","TRACED","TRACES","TRADES","WASTED","WATERS","ACRES","ACTED",
    "AFTER","AVERT","BADGE","BARGE","BASED","BATES","BEADS","BEARD","BEARS","BEAST",
    "BEATS","BRACE","BRAVE","BREAD","BREWS","CADET","CADRE","CAFES","CAGED","CAGES",
    "CARBS","CARDS","CARED","CARES","CARTE","CARTS","CARVE","CASTE","CATER","CAVED",
    "CAVES","CEDAR","CESAR","CRABS","CRAFT","CRATE","CRAVE","CRAZE","CREST","CREWS",
    "DARES","DARTS","DATES","DEBRA","DEBTS","DRAFT","DRAGS","DRAWS","DWARF","EDGAR",
    "EXACT","EXTRA","FACED","FACES","FACET","FACTS","FADES","FARCE","FARED","FARES",
    "FARTS","FATED","FATES","FAVES","FEARS","FEAST","FEATS","GARDE","GATED","GATES",
    "GAZED","GEARS","GRABS","GRACE","GRADE","GRADS","GRAFT","GRATE","GRAVE","GRAZE",
    "GREAT","RACED","RACES","RAGED","RATED","RATES","RAVED","REACT","READS","SABER",
    "SAFER","SAVED","SAVER","SCARE","SCARF","SCREW","STAGE","STARE","STAVE","STEAD",
    "STRAW","SWEAR","SWEAT","TAXED","TAXES","TEARS","TEXAS","TRACE","TRADE","TREAD",
    "VEGAS","VERBS","WAGED","WAGER","WAGES","WARDS","WARES","WARTS","WASTE","WATER",
    "WAVED","WAVES","WAXED","WEARS","ZEBRA","ACES","ACRE","ACTS","AGED","AGES","ARCS",
    "ARSE","ARTS","AXES","BAGS","BARD","BARE","BARS","BART","BASE","BATS","BEAD",
    "BEAR","BEAT","BEDS","BEGS","BERT","BEST","BETA","BETS","BRAD","BRAG","BRAS",
    "BRAT","BRED","BREW","CABS","CAFE","CAGE","CAGR","CARB","CARD","CARE","CARS",
    "CART","CASE","CAST","CATS","CAVE","CRAB","CREW","DAFT","DARE","DART","DATE",
    "DAVE","DEAF","DEAR","DEBT","DEVS","DRAG","DRAW","DREW","EARS","EAST","EATS",
    "ERAS","EZRA","FACE","FACT","FADE","FAQS","FARE","FART","FAST","FATE","FATS",
    "FAVE","FEAR","FEAT","FEDS","FEST","FETA","FRED","FRET","GABE","GATE","GAVE",
    "GAZE","GEAR","GETS","GRAB","GRAD","GRAS","GREW","RACE","RAFT","RAGE","RAGS",
    "RATE","RATS","RAVE","READ","REDS","REST","SAFE","SAGE","SAVE","SCAR","SEAT",
    "SECT","STAB","STAG","STAR","STEW","SWAG","SWAT","TABS","TAGS","TEAR","TEAS",
    "VASE","VAST","VERA","VERB","VEST","VETS","WADE","WAGE","WARD","WARE","WARS",
    "WAVE","WEAR","WEBS","WEST","ZEST"]
    // "ABC","ABS","ACE","ACT","ADS","AGE","ARC",
    // "ARE","ART","ATE","AVE","AWE","BAD","BAG","BAR","BAT","BED","BEG","BET","BRA",
    // "BTW","CAB","CAR","CAT","CBD","CBS","CDS","DEC","DES","EAR","EAT","ERA","EST",
    // "ETC","FAB","FAQ","FAR","FAT","FAX","FDA","FEB","FED","FEW","GAS","GET","RAT",
    // "RAW","RED","REV","SAD","SAT","SAW","SEA","SEC","SET","SEW","SEX","TAB","TAD",
    // "TAG","TAX","TEA","TED","VAT","VET","WAR","WAS","WAX","WEB","WET"]

const RWORDS = ["LUMPKIN","HOMILY","HOMINY","HOPIUM","HOPKIN","JOPLIN","JUMPIN",
    "LINKUP","MOULIN","NYMPHO","PHYLUM","PLINKO","POULIN","UNHOLY","UPJOHN","UPLINK",
    "YUMIKO","HINKY","HOKUM","HONKY","HOPIN","HUMPY","HUNKY","HYPNO","IMPLY","JOHNY",
    "JOKIN","JULIO","JUMPY","JUNIO","JUNKO","JUNKY","KOHLI","LIMON","LINKY","LUKIN",
    "LUMPY","LUPIN","LYMPH","MILKY","MINHO","MINKY","MPHIL","MUHLY","NIMOY","NJOKU",
    "NYMPH","OPIUM","PHILO","PHONY","PILON","PINKO","PINKY","PINOY","PLINK","PLINY",
    "PLONK","PLUNK","POLYU","PULMO","PUNKY","PYLON","UKIYO","UNHIP","UNMIK","YOINK",
    "YUKIO","YUKON","YULIN","HILO","HINO","HOLI","HOLM","HOLY","HONK","HOPI","HULK",
    "HUMP","HUNK","HUON","HYIP","HYMN","HYPO","HYUK","HYUN","IHOP","IKON","IMHO",
    "INKY","IPOH","JMHO","JOHN","JOIN","JOLY","JONI","JULY","JUMP","JUNK","JUNO",
    "KHIN","KHOI","KHON","KHUN","KILN","KILO","KINO","KMPH","KOHL","KOHN","KOJI",
    "KOLN","KOMI","KOPI","KUHL","KUHN","KUMI","KUNI","KYLO","LIMO","LIMP","LINK",
    "LINO","LION","LIPO","LOIN","LOKI","LOUP","LUMO","LUMP","LUPO","LYIN","LYON",
    "MIHO","MIKO","MILK","MILO","MINK","MINO","MIYU","MOLY","MONI","MONK","MONY",
    "MUJI","MUNI","MUNK","MUON","NIKO","NIMH","NMOL","OHIM","OHIP","OILY","OINK",
    "OLIM","OLIN","OMNI","ONLY","OPML","PHIL","PHIN","PINK","PINO","PLOY","PLUM",
    "POKY","POLK","POLY","PONY","PUNK","PUNO","PUNY","UKIP","UMNO","UMPH","UPON",
    "YOLK","YOMI","YONI","YOUN","YUKI","YUKO","YUMI"]
    // "HIM","HIN","HIP","HKU","HMI",
    // "HMO","HOI","HOL","HOM","HON","HOP","HOU","HOY","HUI","HUM","HUN","ILK","ILM",
    // "ILO","IMO","IMP","INK","INU","IOM","ION","IOP","IOU","IPL","IPM","IPO","IUP",
    // "JIM","JIN","JIO","JIU","JMU","JOH","JOI","JON","JOY","JPL","JPY","JUL","JUN",
    // "KIM","KIN","KIP","KLM","KNO","KOH","KOI","KOL","KON","KPH","KPI","KUN","KUO",
    // "KYI","KYM","KYO","KYU","LIK","LIM","LIN","LIP","LIU","LNP","LOI","LOK","LON",
    // "LOP","LOU","LOY","LPN","LUK","LUO","LYN","MIL","MIN","MIO","MIP","MIU","MLK",
    // "MLN","MLP","MOH","MOI","MOJ","MOL","MON","MOP","MOU","MPH","MPI","MUH","MUI",
    // "MUN","NHK","NHL","NIH","NIK","NIL","NIM","NIP","NIU","NLM","NLP","NOI","NOK",
    // "NOM","NOU","NPI","NPM","NPO","NUH","NUI","NUM","NUP","NYU","OHL","OHM","OIL",
    // "OLI","ONI","OPI","OPM","OUI","PHI","PHO","PHU","PIL","PIM","PIN","PIO","PIU",
    // "PKI","PLM","PLN","PLO","PLY","PMI","PML","PMO","POI","POL","POM","PON","PUN",
    // "UHM","ULI","UML","UMP","UNH","UNI","UNO","UPI","YIN","YIP","YOM","YON","YOU",
    // "YUH","YUI","YUK","YUM","YUN","YUP"]

const LSET = new Set(LWORDS.join(""));
const RSET = new Set(RWORDS.join(""));

const rand=a=>a[Math.floor(Math.random()*a.length)];

/* ================= ROOT APP ================= */

export default function App(){
  const [screen,setScreen]=useState("menu");

  return(
    <>
      {screen==="menu" && <Menu setScreen={setScreen}/>}
      {screen==="dual" && <DualGame goMenu={()=>setScreen("menu")}/>}
      {screen==="other" && <OtherMode goMenu={()=>setScreen("menu")}/>}
      {screen==="third" && <ThirdMode goMenu={()=>setScreen("menu")}/>}
    </>
  );
}

function createWordPicker(words, historySize = 5){
  const history = [];

  return function pick(){
    let w;
    do{
      w = words[Math.floor(Math.random()*words.length)];
    }while(history.includes(w));

    history.push(w);
    if(history.length > historySize)
      history.shift();

    return w;
  };
}


function Game({ swapMode, flipMode, goMenu }) {

  const pickLeft = useRef(createWordPicker(LWORDS));
  const pickRight = useRef(createWordPicker(RWORDS));

  const [leftWord,setLeftWord]=useState(pickLeft.current());
  const [rightWord,setRightWord]=useState(pickRight.current());

  const [leftIndex,setLeftIndex]=useState(0);
  const [rightIndex,setRightIndex]=useState(0);

  const [leftHits,setLeftHits]=useState(0);
  const [rightHits,setRightHits]=useState(0);

  const [leftAttempts,setLeftAttempts]=useState(0);
  const [rightAttempts,setRightAttempts]=useState(0);

  const [time,setTime]=useState(30);
  const [phase,setPhase]=useState(10);
  const [started,setStarted]=useState(false);
  //const [swapped,setSwapped]=useState(false);

  /* TIMER */
  useEffect(()=>{
    if(!started||time<=0)return;

    const t=setInterval(()=>{
      setTime(t=>t-1);

      if(swapMode){
        setPhase(p=>{
          if(p===1){
            //setSwapped(s=>!s);
            return 10;
          }
          return p-1;
        });
      }
    },1000);

    return()=>clearInterval(t);
  },[started,time,swapMode]);

  /* INPUT */
  useEffect(()=>{
    function key(e){
      if(time<=0)return;
      if(!started)setStarted(true);

      const k=e.key.toUpperCase();
      if(k.length!==1)return;

      if(LSET.has(k) && leftWord[leftIndex]){
        setLeftAttempts(a=>a+1);
        if(k===leftWord[leftIndex]){
          setLeftHits(h=>h+1);
          if(leftIndex+1===leftWord.length){
            setLeftWord(pickLeft.current());
            setLeftIndex(0);
          } else setLeftIndex(i=>i+1);
        }
      }

      if(RSET.has(k) && rightWord[rightIndex]){
        setRightAttempts(a=>a+1);
        if(k===rightWord[rightIndex]){
          setRightHits(h=>h+1);
          if(rightIndex+1===rightWord.length){
            setRightWord(pickRight.current());
            setRightIndex(0);
          } else setRightIndex(i=>i+1);
        }
      }
    }

    window.addEventListener("keydown",key);
    return()=>window.removeEventListener("keydown",key);
  },[leftIndex,rightIndex,leftWord,rightWord,started,time]);

  function restart(){
    setLeftWord(pickLeft.current());
    setRightWord(pickRight.current());
    setLeftIndex(0);
    setRightIndex(0);
    setLeftHits(0);
    setRightHits(0);
    setLeftAttempts(0);
    setRightAttempts(0);
    setTime(30);
    setPhase(10);
    setStarted(false);
    setSwapped(false);
  }

  const minutes=(30-time)/60||1/60;

  const leftWPM=Math.round((leftHits/5)/minutes);
  const rightWPM=Math.round((rightHits/5)/minutes);
  const totalWPM=Math.round(((leftHits+rightHits)/5)/minutes);

  const leftAcc=leftAttempts?Math.round(leftHits/leftAttempts*100):100;
  const rightAcc=rightAttempts?Math.round(rightHits/rightAttempts*100):100;
  const totalAcc=(leftAttempts+rightAttempts)
    ?Math.round((leftHits+rightHits)/(leftAttempts+rightAttempts)*100)
    :100;

  const swapped = swapMode && Math.floor((30 - time)/6) % 2 === 1;
  const flipped = flipMode && Math.floor((30 - time)/3) % 2 === 1;
  const leftRender = swapped ? "right" : "left";
  const rightRender = swapped ? "left" : "right";

  function renderSide(side){
    const isLeft = side==="left";

    const word = isLeft ? leftWord : rightWord;
    const index = isLeft ? leftIndex : rightIndex;
    const wpm = isLeft ? leftWPM : rightWPM;
    const acc = isLeft ? leftAcc : rightAcc;
    const boxStyle = {
      ...(isLeft ? styles.leftBox : styles.rightBox),
      transform: flipped ? "rotate(180deg)" : "none"
    };

    return(
      <div style={styles.column}>
        <div style={boxStyle}>
          {word.split("").map((c,i)=>(
            <span key={i}
              style={{
                color:i<index ? "#22c55e" : (isLeft?"black":"white"),
                borderBottom:i===index
                  ?`3px solid ${isLeft?"black":"white"}`
                  :"none"
              }}>
              {c}
            </span>
          ))}
        </div>

        <div style={styles.stat}>WPM: {wpm}</div>
        <div style={styles.stat}>Acc: {acc}%</div>
      </div>
    );
  }

  return(
    <div style={styles.page}>
      <button style={styles.menuBtn} onClick={goMenu}>Menu</button>

      <div style={styles.row}>
        {renderSide(leftRender)}
        {renderSide(rightRender)}
      </div>

      <div style={styles.bottom}>
        <div>Total WPM: {totalWPM}</div>
        <div>Total Accuracy: {totalAcc}%</div>
        {/* {swapMode && <div>Swap In: {phase}</div>} */}
        <div>Time: {time}</div>
      </div>

      {time<=0&&(
        <button style={styles.btn} onClick={restart}>
          Restart
        </button>
      )}
    </div>
  );
}


/* ================= MENU ================= */

function Menu({setScreen}){
  return(
    <div style={menu.page}>
      <h1 style={{fontSize:64}}>TypeSplit</h1>

      <button style={menu.btn} onClick={()=>setScreen("dual")}>
        Normal Mode
      </button>

      <button style={menu.btn} onClick={()=>setScreen("other")}>
        Evil Mode
      </button>

      <button style={menu.btn} onClick={()=>setScreen("third")}>
        Really Evil Mode
      </button>
    </div>
  );
}

function DualGame({ goMenu }) {
  return <Game swapMode={false} flipMode={false} goMenu={goMenu} />;
}

function OtherMode({ goMenu }) {
  return <Game swapMode={true} flipMode={false} goMenu={goMenu} />;
}

function ThirdMode({ goMenu }) {
  return <Game swapMode={true} flipMode={true} goMenu={goMenu} />;
}

/* ================= STYLES ================= */

const menu={
  page:{
    height:"100vh",
    width:"100vw",
    background:"#111",
    color:"white",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    gap:30,
    fontFamily:"monospace"
  },
  btn:{
    fontSize:28,
    padding:"18px 60px",
    borderRadius:14,
    border:"none",
    cursor:"pointer",
    background:"#22c55e"
  }
};

const styles={
  page:{
    height:"100vh",
    width:"100vw",
    background:"#111",
    color:"white",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    fontFamily:"monospace"
  },

  row:{ display:"flex", width:"100%", height:"60%" },

  column:{
    flex:1,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    gap:16
  },

  leftBox:{
    background:"white",
    padding:"60px",
    fontSize:64,
    borderRadius:16,
    letterSpacing:4,
    width:"80%",
    textAlign:"center"
  },

  rightBox:{
    background:"black",
    border:"2px solid white",
    padding:"60px",
    fontSize:64,
    borderRadius:16,
    letterSpacing:4,
    width:"80%",
    textAlign:"center"
  },

  stat:{fontSize:22},

  bottom:{
    marginTop:30,
    display:"flex",
    gap:50,
    fontSize:26
  },

  btn:{
    marginTop:30,
    padding:"14px 40px",
    fontSize:20,
    borderRadius:12,
    border:"none",
    background:"#22c55e",
    cursor:"pointer"
  },

  menuBtn:{
    position:"absolute",
    top:20,
    left:20,
    padding:"8px 20px",
    fontSize:16,
    borderRadius:8,
    border:"none",
    cursor:"pointer"
  }
};