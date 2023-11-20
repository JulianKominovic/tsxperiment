import active4d from "./Active4D.json";
import allHallowsEve from "./All Hallows Eve.json";
import amy from "./Amy.json";
import birdsOfParadise from "./Birds of Paradise.json";
import blackboard from "./Blackboard.json";
import brillianceBlack from "./Brilliance Black.json";
import brillianceDull from "./Brilliance Dull.json";
import chromeDevtools from "./Chrome DevTools.json";
import cloudsMidnight from "./Clouds Midnight.json";
import clouds from "./Clouds.json";
import cobalt from "./Cobalt.json";
import cobalt2 from "./Cobalt2.json";
import dawn from "./Dawn.json";
import dracula from "./Dracula.json";
import dreamweaver from "./Dreamweaver.json";
import eiffel from "./Eiffel.json";
import espressoLibre from "./Espresso Libre.json";
import githubDark from "./GitHub Dark.json";
import githubLight from "./GitHub Light.json";
import github from "./GitHub.json";
import idle from "./IDLE.json";
import katzenmilch from "./Katzenmilch.json";
import kuroirTheme from "./Kuroir Theme.json";
import lazy from "./LAZY.json";
import magicwbAmiga from "./MagicWB (Amiga).json";
import merbivoreSoft from "./Merbivore Soft.json";
import merbivore from "./Merbivore.json";
import monokaiBright from "./Monokai Bright.json";
import monokai from "./Monokai.json";
import nightOwl from "./Night Owl.json";
import nord from "./Nord.json";
import oceanicNext from "./Oceanic Next.json";
import pastelsOnDark from "./Pastels on Dark.json";
import slushAndPoppies from "./Slush and Poppies.json";
import solarizedDark from "./Solarized-dark.json";
import solarizedLight from "./Solarized-light.json";
import spaceCadet from "./SpaceCadet.json";
import sunburst from "./Sunburst.json";
import textmateMacClassic from "./Textmate (Mac Classic).json";
import tomorrowNightBlue from "./Tomorrow-Night-Blue.json";
import tomorrowNightBright from "./Tomorrow-Night-Bright.json";
import tomorrowNightEighties from "./Tomorrow-Night-Eighties.json";
import tomorrowNight from "./Tomorrow-Night.json";
import tomorrow from "./Tomorrow.json";
import twilight from "./Twilight.json";
import upstreamSunburst from "./Upstream Sunburst.json";
import vibrantInk from "./Vibrant Ink.json";
import xcodeDefault from "./Xcode_default.json";
import zenburnesque from "./Zenburnesque.json";
import iplastic from "./iPlastic.json";
import idlefingers from "./idleFingers.json";
import krtheme from "./krTheme.json";
import monoindustrial from "./monoindustrial.json";

type MonacoThemes =
  | "active4d"
  | "allHallowsEve"
  | "amy"
  | "birdsOfParadise"
  | "blackboard"
  | "brillianceBlack"
  | "brillianceDull"
  | "chromeDevtools"
  | "cloudsMidnight"
  | "clouds"
  | "cobalt"
  | "cobalt2"
  | "dawn"
  | "dracula"
  | "dreamweaver"
  | "eiffel"
  | "espressoLibre"
  | "githubDark"
  | "githubLight"
  | "github"
  | "idle"
  | "katzenmilch"
  | "kuroirTheme"
  | "lazy"
  | "magicwbAmiga"
  | "merbivoreSoft"
  | "merbivore"
  | "monokaiBright"
  | "monokai"
  | "nightOwl"
  | "nord"
  | "oceanicNext"
  | "pastelsOnDark"
  | "slushAndPoppies"
  | "solarizedDark"
  | "solarizedLight"
  | "spaceCadet"
  | "sunburst"
  | "textmateMacClassic"
  | "tomorrowNightBlue"
  | "tomorrowNightBright"
  | "tomorrowNightEighties"
  | "tomorrowNight"
  | "tomorrow"
  | "twilight"
  | "upstreamSunburst"
  | "vibrantInk"
  | "xcodeDefault"
  | "zenburnesque"
  | "iplastic"
  | "idlefingers"
  | "krtheme"
  | "monoindustrial";
export const monacoThemes: Record<MonacoThemes, string> = {
  active4d: "Active4D",
  allHallowsEve: "All Hallows Eve",
  amy: "Amy",
  birdsOfParadise: "Birds of Paradise",
  blackboard: "Blackboard",
  brillianceBlack: "Brilliance Black",
  brillianceDull: "Brilliance Dull",
  chromeDevtools: "Chrome DevTools",
  cloudsMidnight: "Clouds Midnight",
  clouds: "Clouds",
  cobalt: "Cobalt",
  cobalt2: "Cobalt2",
  dawn: "Dawn",
  dracula: "Dracula",
  dreamweaver: "Dreamweaver",
  eiffel: "Eiffel",
  espressoLibre: "Espresso Libre",
  githubDark: "GitHub Dark",
  githubLight: "GitHub Light",
  github: "GitHub",
  idle: "IDLE",
  katzenmilch: "KatzenMilch",
  kuroirTheme: "Kuroir Theme",
  lazy: "LAZY",
  magicwbAmiga: "MagicWB (Amiga)",
  merbivoreSoft: "Merbivore Soft",
  merbivore: "Merbivore",
  monokaiBright: "Monokai Bright",
  monokai: "Monokai",
  nightOwl: "Night Owl",
  nord: "Nord",
  oceanicNext: "Oceanic Next",
  pastelsOnDark: "Pastels on Dark",
  slushAndPoppies: "Slush and Poppies",
  solarizedDark: "Solarized-dark",
  solarizedLight: "Solarized-light",
  spaceCadet: "SpaceCadet",
  sunburst: "Sunburst",
  textmateMacClassic: "Textmate (Mac Classic)",
  tomorrowNightBlue: "Tomorrow-Night-Blue",
  tomorrowNightBright: "Tomorrow-Night-Bright",
  tomorrowNightEighties: "Tomorrow-Night-Eighties",
  tomorrowNight: "Tomorrow-Night",
  tomorrow: "Tomorrow",
  twilight: "Twilight",
  upstreamSunburst: "Upstream Sunburst",
  vibrantInk: "Vibrant Ink",
  xcodeDefault: "Xcode_default",
  zenburnesque: "Zenburnesque",
  iplastic: "iPlastic",
  idlefingers: "idleFingers",
  krtheme: "krTheme",
  monoindustrial: "monoindustrial",
};

export function defineMonacoThemes() {
  ((window as any).monaco as any)?.editor?.defineTheme("active4d", active4d);
  ((window as any).monaco as any)?.editor?.defineTheme(
    "allHallowsEve",
    allHallowsEve
  );
  ((window as any).monaco as any)?.editor?.defineTheme("amy", amy);
  ((window as any).monaco as any)?.editor?.defineTheme(
    "birdsOfParadise",
    birdsOfParadise
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "blackboard",
    blackboard
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "brillianceBlack",
    brillianceBlack
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "brillianceDull",
    brillianceDull
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "chromeDevtools",
    chromeDevtools
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "cloudsMidnight",
    cloudsMidnight
  );
  ((window as any).monaco as any)?.editor?.defineTheme("clouds", clouds);
  ((window as any).monaco as any)?.editor?.defineTheme("cobalt", cobalt);
  ((window as any).monaco as any)?.editor?.defineTheme("cobalt2", cobalt2);
  ((window as any).monaco as any)?.editor?.defineTheme("dawn", dawn);
  ((window as any).monaco as any)?.editor?.defineTheme("dracula", dracula);
  ((window as any).monaco as any)?.editor?.defineTheme(
    "dreamweaver",
    dreamweaver
  );
  ((window as any).monaco as any)?.editor?.defineTheme("eiffel", eiffel);
  ((window as any).monaco as any)?.editor?.defineTheme(
    "espressoLibre",
    espressoLibre
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "githubDark",
    githubDark
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "githubLight",
    githubLight
  );
  ((window as any).monaco as any)?.editor?.defineTheme("github", github);
  ((window as any).monaco as any)?.editor?.defineTheme("idle", idle);
  ((window as any).monaco as any)?.editor?.defineTheme(
    "katzenmilch",
    katzenmilch
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "kuroirTheme",
    kuroirTheme
  );
  ((window as any).monaco as any)?.editor?.defineTheme("lazy", lazy);
  ((window as any).monaco as any)?.editor?.defineTheme(
    "magicwbAmiga",
    magicwbAmiga
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "merbivoreSoft",
    merbivoreSoft
  );
  ((window as any).monaco as any)?.editor?.defineTheme("merbivore", merbivore);
  ((window as any).monaco as any)?.editor?.defineTheme(
    "monokaiBright",
    monokaiBright
  );
  ((window as any).monaco as any)?.editor?.defineTheme("monokai", monokai);
  ((window as any).monaco as any)?.editor?.defineTheme("nightOwl", nightOwl);
  ((window as any).monaco as any)?.editor?.defineTheme("nord", nord);
  ((window as any).monaco as any)?.editor?.defineTheme(
    "oceanicNext",
    oceanicNext
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "pastelsOnDark",
    pastelsOnDark
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "slushAndPoppies",
    slushAndPoppies
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "solarizedDark",
    solarizedDark
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "solarizedLight",
    solarizedLight
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "spaceCadet",
    spaceCadet
  );
  ((window as any).monaco as any)?.editor?.defineTheme("sunburst", sunburst);
  ((window as any).monaco as any)?.editor?.defineTheme(
    "textmateMacClassic",
    textmateMacClassic
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "tomorrowNightBlue",
    tomorrowNightBlue
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "tomorrowNightBright",
    tomorrowNightBright
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "tomorrowNightEighties",
    tomorrowNightEighties
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "tomorrowNight",
    tomorrowNight
  );
  ((window as any).monaco as any)?.editor?.defineTheme("tomorrow", tomorrow);
  ((window as any).monaco as any)?.editor?.defineTheme("twilight", twilight);
  ((window as any).monaco as any)?.editor?.defineTheme(
    "upstreamSunburst",
    upstreamSunburst
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "vibrantInk",
    vibrantInk
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "xcodeDefault",
    xcodeDefault
  );
  ((window as any).monaco as any)?.editor?.defineTheme(
    "zenburnesque",
    zenburnesque
  );
  ((window as any).monaco as any)?.editor?.defineTheme("iplastic", iplastic);
  ((window as any).monaco as any)?.editor?.defineTheme(
    "idlefingers",
    idlefingers
  );
  ((window as any).monaco as any)?.editor?.defineTheme("krtheme", krtheme);
  ((window as any).monaco as any)?.editor?.defineTheme(
    "monoindustrial",
    monoindustrial
  );
}
export function setTheme(themeName: MonacoThemes) {
  ((window as any).monaco as any)?.editor?.setTheme(themeName);
}
//   /**
//      * Define a new theme or update an existing theme.
//      */
//   export function defineTheme(themeName: string, themeData: IStandaloneThemeDat): void;

//   /**
//    * Switches to a theme.
//    */
//   export function setTheme(themeName: string): void;

// export function loadTheme(theme: MonacoThemes) {
//   switch (theme) {
//     case "active4d":
//       return active4d;
//     case "allHallowsEve":
//       return allHallowsEve;
//     case "amy":
//       return amy;
//     case "birdsOfParadise":
//       return birdsOfParadise;
//     case "blackboard":
//       return blackboard;
//     case "brillianceBlack":
//       return brillianceBlack;
//     case "brillianceDull":
//       return brillianceDull;
//     case "chromeDevtools":
//       return chromeDevtools;
//     case "cloudsMidnight":
//       return cloudsMidnight;
//     case "clouds":
//       return clouds;
//     case "cobalt":
//       return cobalt;
//     case "cobalt2":
//       return cobalt2;
//     case "dawn":
//       return dawn;
//     case "dracula":
//       return dracula;
//     case "dreamweaver":
//       return dreamweaver;
//     case "eiffel":
//       return eiffel;
//     case "espressoLibre":
//       return espressoLibre;
//     case "githubDark":
//       return githubDark;
//     case "githubLight":
//       return githubLight;
//     case "github":
//       return github;
//     case "idle":
//       return idle;
//     case "katzenmilch":
//       return katzenmilch;
//     case "kuroirTheme":
//       return kuroirTheme;
//     case "lazy":
//       return lazy;
//     case "magicwbAmiga":
//       return magicwbAmiga;
//     case "merbivoreSoft":
//       return merbivoreSoft;
//     case "merbivore":
//       return merbivore;
//     case "monokaiBright":
//       return monokaiBright;
//     case "monokai":
//       return monokai;
//     case "nightOwl":
//       return nightOwl;
//     case "nord":
//       return nord;
//     case "oceanicNext":
//       return oceanicNext;
//     case "pastelsOnDark":
//       return pastelsOnDark;
//     case "slushAndPoppies":
//       return slushAndPoppies;
//     case "solarizedDark":
//       return solarizedDark;
//     case "solarizedLight":
//       return solarizedLight;
//     case "spaceCadet":
//       return spaceCadet;
//     case "sunburst":
//       return sunburst;
//     case "textmateMacClassic":
//       return textmateMacClassic;
//     case "tomorrowNightBlue":
//       return tomorrowNightBlue;
//     case "tomorrowNightBright":
//       return tomorrowNightBright;
//     case "tomorrowNightEighties":
//       return tomorrowNightEighties;
//     case "tomorrowNight":
//       return tomorrowNight;
//     case "tomorrow":
//       return tomorrow;
//     case "twilight":
//       return twilight;
//     case "upstreamSunburst":
//       return upstreamSunburst;
//     case "vibrantInk":
//       return vibrantInk;
//     case "xcodeDefault":
//       return xcodeDefault;
//     case "zenburnesque":
//       return zenburnesque;
//     case "iplastic":
//       return iplastic;
//     case "idlefingers":
//       return idlefingers;
//     case "krtheme":
//       return krtheme;
//     case "monoindustrial":
//       return monoindustrial;
//     default:
//       throw new Error("Unknown Theme: " + theme);
//   }
// }

// function setEditorTheme(monaco: any) {
//   ((window as any).monaco as any)?.editor?.defineTheme("onedark", {
//     base: "vs-dark",
//     inherit: true,
//     rules: [
//       {
//         token: "comment",
//         foreground: "#5d7988",
//         fontStyle: "italic",
//       },
//       { token: "constant", foreground: "#e06c75" },
//     ],
//     colors: {
//       "editor.background": "#21252b",
//     },
//   });
// }
