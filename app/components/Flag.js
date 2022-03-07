import { requestFlag } from "../helpers/requestFlag.js";

export function Flag(props) {
  let {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
  } = props;
  const givenNumber = population;
  let internationalNumberFormat = new Intl.NumberFormat("en-US");

  document.addEventListener("click", (e) => {
    if (e.target.matches(".backHome") || e.target.matches(".backHome *")) {
      location.href = "http://127.0.0.1:5500/FlagsChallengeSPA/";
    }
  });

  const getCurrencies = () => {
    let valores = Object.values(currencies); // claves = ["nombre", "color", "macho", "edad"]
    for (let i = 0; i < valores.length; i++) {
      return valores[i].name;
    }
  };

  const getNativeName = () => {
    let valores = Object.values(name.nativeName); // claves = ["nombre", "color", "macho", "edad"]
    for (let i = 0; i < valores.length; i++) {
      return valores[0].official;
    }
  };

  const getLanguages = () => {
    let valores = Object.values(languages); // claves = ["nombre", "color", "macho", "edad"]
    let lang = "";
    let cadena;
    for (let i = 0; i < valores.length; i++) {
      if (valores.length === 1) {
        lang += `${valores[i]}`;
      } else {
        lang += `${valores[i]} `;
      }
    }
    let ab = lang.split(" ");
    return ab;
  };
  const getBorder = async () => {
    if (!borders) {
      return (document.querySelector(
        ".bordeCountry"
      ).innerHTML = `<span>None</span>`);
    } else {
      let data = "";
      borders.forEach(async (border) => {
        await requestFlag({
          url: `https://restcountries.com/v3.1/alpha/${border}`,
          cbSuccess: (abc) => {
            data += `<span data-dark="darkMode">${abc[0].name.common}</span>`;
            //  console.info(data);
            document.querySelector(".bordeCountry").innerHTML = data;
          },
        });
        //return data;
      });
    }
  };

  setTimeout(() => {
    getBorder();
  }, 100);
  return `
    <button class="backHome" data-dark="darkMode">
   <img src="app/assets/arrowLeft.svg" alt="" srcset="">
   <p>Back</p>
    </button>
  
    <div class="container-flag">

    <div class="imgContainer">
    <img src="${flags.png}" alt="${name.common}">
    </div>

    <div class="specs">
    <h1 class="title" data-dark="darkMode">
    ${name.common}
    </h1>

    <div class="containerallData">
    <div class="country-spec">
    <p><b>Native Name:</b>${getNativeName()}</p>
    <p><b>Population:</b>${internationalNumberFormat.format(
      givenNumber
    )}</b></p>
    <p><b>Region:</b>${region}</p>
    <p><b>Region:</b>${subregion}</p>
    <p><b>Region:</b>${capital}</p>
    </div>
    <div class="frontier">
    <p><b>Top Level Domain:</b>${tld[0]}</p>
    <p><b>Currencies:</b>${getCurrencies()}</p>
    <p><b>Languages:</b>${getLanguages()}</p>
    </div>
</div>
<div class="border">
<p><b>Border Countries:</b></p>
<div class="bordeCountry" ></div>
</div>
    </div>

    </div>
  
  `;
}