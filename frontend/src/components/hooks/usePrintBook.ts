import { BookValues } from "@utils/interfaces";
import {
  useEffect,
  useRef,
  useState,
  MutableRefObject,
  useCallback,
} from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { axiosInstance } from "@services/api-client";

const usePrintBook = (pageCount: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);

  const [selectedBookSize, setSelectedBookSize] = useState<string>("");
  const [selectedInteriorColor, setSelectedInteriorColor] =
    useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedPrintQuality, setSelectedPrintQuality] = useState<string>("");
  const [selectedPaperType, setSelectedPaperType] = useState<string>("");
  const [selectedBindingType, setSelectedBindingType] = useState<string>("");
  const [selectedCoverFinish, setSelectedCoverFinish] = useState<string>("");
  const [shippingOptions, setShippingOptions] = useState<any>([]);
  const [country, setCountry] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");

  const [quantity, setQuantity] = useState<string>("");

  const [selectedShippingOption, setSelectedShippingOption] = useState<
    string | null
  >(null);

  const [costs, setCosts] = useState<any>(null);

  const fullName: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const streetAddress: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const city: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const state: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const postalCode: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const email: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const phoneNumber: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const [podPackageId, setPodPackageId] = useState<string>("");
  useEffect(() => {
    axios
      .get(
        "https://assets.lulu.com/media/specs/lulu-print-api-spec-sheet.xlsx",
        {
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        const data = new Uint8Array(response.data);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[1]];
        const jsonData = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
        });
        setData(
          jsonData.filter((data: any) => {
            return data[1] === "Yes";
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  }, []);

  const countryList = {
    Afghanistan: "AF",
    Albania: "AL",
    Algeria: "DZ",
    "American Samoa": "AS",
    Andorra: "AD",
    Angola: "AO",
    Anguilla: "AI",
    Antarctica: "AQ",
    "Antigua and Barbuda": "AG",
    Argentina: "AR",
    Armenia: "AM",
    Aruba: "AW",
    Australia: "AU",
    Austria: "AT",
    Azerbaijan: "AZ",
    "Bahamas (the)": "BS",
    Bahrain: "BH",
    Bangladesh: "BD",
    Barbados: "BB",
    Belarus: "BY",
    Belgium: "BE",
    Belize: "BZ",
    Benin: "BJ",
    Bermuda: "BM",
    Bhutan: "BT",
    "Bolivia (Plurinational State of)": "BO",
    "Bonaire, Sint Eustatius and Saba": "BQ",
    "Bosnia and Herzegovina": "BA",
    Botswana: "BW",
    "Bouvet Island": "BV",
    Brazil: "BR",
    "British Indian Ocean Territory (the)": "IO",
    "Brunei Darussalam": "BN",
    Bulgaria: "BG",
    "Burkina Faso": "BF",
    Burundi: "BI",
    "Cabo Verde": "CV",
    Cambodia: "KH",
    Cameroon: "CM",
    Canada: "CA",
    "Cayman Islands (the)": "KY",
    "Central African Republic (the)": "CF",
    Chad: "TD",
    Chile: "CL",
    China: "CN",
    "Christmas Island": "CX",
    "Cocos (Keeling) Islands (the)": "CC",
    Colombia: "CO",
    "Comoros (the)": "KM",
    "Congo (the Democratic Republic of the)": "CD",
    "Congo (the)": "CG",
    "Cook Islands (the)": "CK",
    "Costa Rica": "CR",
    Croatia: "HR",
    Cuba: "CU",
    Curaçao: "CW",
    Cyprus: "CY",
    Czechia: "CZ",
    "Côte d'Ivoire": "CI",
    Denmark: "DK",
    Djibouti: "DJ",
    Dominica: "DM",
    "Dominican Republic (the)": "DO",
    Ecuador: "EC",
    Egypt: "EG",
    "El Salvador": "SV",
    "Equatorial Guinea": "GQ",
    Eritrea: "ER",
    Estonia: "EE",
    Eswatini: "SZ",
    Ethiopia: "ET",
    "Falkland Islands (the) [Malvinas]": "FK",
    "Faroe Islands (the)": "FO",
    Fiji: "FJ",
    Finland: "FI",
    France: "FR",
    "French Guiana": "GF",
    "French Polynesia": "PF",
    "French Southern Territories (the)": "TF",
    Gabon: "GA",
    "Gambia (the)": "GM",
    Georgia: "GE",
    Germany: "DE",
    Ghana: "GH",
    Gibraltar: "GI",
    Greece: "GR",
    Greenland: "GL",
    Grenada: "GD",
    Guadeloupe: "GP",
    Guam: "GU",
    Guatemala: "GT",
    Guernsey: "GG",
    Guinea: "GN",
    "Guinea-Bissau": "GW",
    Guyana: "GY",
    Haiti: "HT",
    "Heard Island and McDonald Islands": "HM",
    "Holy See (the)": "VA",
    Honduras: "HN",
    "Hong Kong": "HK",
    Hungary: "HU",
    Iceland: "IS",
    India: "IN",
    Indonesia: "ID",
    "Iran (Islamic Republic of)": "IR",
    Iraq: "IQ",
    Ireland: "IE",
    "Isle of Man": "IM",
    Israel: "IL",
    Italy: "IT",
    Jamaica: "JM",
    Japan: "JP",
    Jersey: "JE",
    Jordan: "JO",
    Kazakhstan: "KZ",
    Kenya: "KE",
    Kiribati: "KI",
    "Korea (the Democratic People's Republic of)": "KP",
    "Korea (the Republic of)": "KR",
    Kuwait: "KW",
    Kyrgyzstan: "KG",
    "Lao People's Democratic Republic (the)": "LA",
    Latvia: "LV",
    Lebanon: "LB",
    Lesotho: "LS",
    Liberia: "LR",
    Libya: "LY",
    Liechtenstein: "LI",
    Lithuania: "LT",
    Luxembourg: "LU",
    Macao: "MO",
    Madagascar: "MG",
    Malawi: "MW",
    Malaysia: "MY",
    Maldives: "MV",
    Mali: "ML",
    Malta: "MT",
    "Marshall Islands (the)": "MH",
    Martinique: "MQ",
    Mauritania: "MR",
    Mauritius: "MU",
    Mayotte: "YT",
    Mexico: "MX",
    "Micronesia (Federated States of)": "FM",
    "Moldova (the Republic of)": "MD",
    Monaco: "MC",
    Mongolia: "MN",
    Montenegro: "ME",
    Montserrat: "MS",
    Morocco: "MA",
    Mozambique: "MZ",
    Myanmar: "MM",
    Namibia: "NA",
    Nauru: "NR",
    Nepal: "NP",
    "Netherlands (the)": "NL",
    "New Caledonia": "NC",
    "New Zealand": "NZ",
    Nicaragua: "NI",
    "Niger (the)": "NE",
    Nigeria: "NG",
    Niue: "NU",
    "Norfolk Island": "NF",
    "Northern Mariana Islands (the)": "MP",
    Norway: "NO",
    Oman: "OM",
    Pakistan: "PK",
    Palau: "PW",
    "Palestine, State of": "PS",
    Panama: "PA",
    "Papua New Guinea": "PG",
    Paraguay: "PY",
    Peru: "PE",
    "Philippines (the)": "PH",
    Pitcairn: "PN",
    Poland: "PL",
    Portugal: "PT",
    "Puerto Rico": "PR",
    Qatar: "QA",
    "Republic of North Macedonia": "MK",
    Romania: "RO",
    "Russian Federation (the)": "RU",
    Rwanda: "RW",
    Réunion: "RE",
    "Saint Barthélemy": "BL",
    "Saint Helena, Ascension and Tristan da Cunha": "SH",
    "Saint Kitts and Nevis": "KN",
    "Saint Lucia": "LC",
    "Saint Martin (French part)": "MF",
    "Saint Pierre and Miquelon": "PM",
    "Saint Vincent and the Grenadines": "VC",
    Samoa: "WS",
    "San Marino": "SM",
    "Sao Tome and Principe": "ST",
    "Saudi Arabia": "SA",
    Senegal: "SN",
    Serbia: "RS",
    Seychelles: "SC",
    "Sierra Leone": "SL",
    Singapore: "SG",
    "Sint Maarten (Dutch part)": "SX",
    Slovakia: "SK",
    Slovenia: "SI",
    "Solomon Islands": "SB",
    Somalia: "SO",
    "South Africa": "ZA",
    "South Georgia and the South Sandwich Islands": "GS",
    "South Sudan": "SS",
    Spain: "ES",
    "Sri Lanka": "LK",
    "Sudan (the)": "SD",
    Suriname: "SR",
    "Svalbard and Jan Mayen": "SJ",
    Sweden: "SE",
    Switzerland: "CH",
    "Syrian Arab Republic": "SY",
    "Taiwan (Province of China)": "TW",
    Tajikistan: "TJ",
    "Tanzania, United Republic of": "TZ",
    Thailand: "TH",
    "Timor-Leste": "TL",
    Togo: "TG",
    Tokelau: "TK",
    Tonga: "TO",
    "Trinidad and Tobago": "TT",
    Tunisia: "TN",
    Turkey: "TR",
    Turkmenistan: "TM",
    "Turks and Caicos Islands (the)": "TC",
    Tuvalu: "TV",
    Uganda: "UG",
    Ukraine: "UA",
    "United Arab Emirates (the)": "AE",
    "United Kingdom of Great Britain and Northern Ireland (the)": "GB",
    "United States Minor Outlying Islands (the)": "UM",
    "United States of America (the)": "US",
    Uruguay: "UY",
    Uzbekistan: "UZ",
    Vanuatu: "VU",
    "Venezuela (Bolivarian Republic of)": "VE",
    "Viet Nam": "VN",
    "Virgin Islands (British)": "VG",
    "Virgin Islands (U.S.)": "VI",
    "Wallis and Futuna": "WF",
    "Western Sahara": "EH",
    Yemen: "YE",
    Zambia: "ZM",
    Zimbabwe: "ZW",
    "Åland Islands": "AX",
  };

  const handleBookSizeChange = (size: string) => {
    setSelectedBookSize(size);
    setSelectedInteriorColor("");
    setSelectedColor("");
    setSelectedPrintQuality("");
    setSelectedPaperType("");
    setSelectedBindingType("");
    setSelectedCoverFinish("");
    setPodPackageId("");
    setShippingOptions([]);
    setSelectedShippingOption("");
    setQuantity("");
    setCountry("");
    setCosts(null);
  };

  const handleInteriorColorChange = (interiorColor: string) => {
    setSelectedInteriorColor(interiorColor);
    setSelectedColor(interiorColor.split("_")[0]);
    setSelectedPrintQuality(interiorColor.split("_")[1]);
    setSelectedPaperType("");
    setSelectedBindingType("");
    setSelectedCoverFinish("");
    setPodPackageId("");
    setShippingOptions([]);
    setSelectedShippingOption("");
    setQuantity("");
    setCountry("");
    setCosts(null);
  };

  const handlePaperTypeChange = (paperType: string) => {
    setSelectedPaperType(paperType);
    setSelectedBindingType("");
    setSelectedCoverFinish("");
    setPodPackageId("");
    setShippingOptions([]);
    setSelectedShippingOption("");
    setQuantity("");
    setCountry("");
    setCosts(null);
  };

  const handleBindingTypeChange = (bindingType: string) => {
    setSelectedBindingType(bindingType);
    setSelectedCoverFinish("");
    setPodPackageId("");
    setShippingOptions([]);
    setSelectedShippingOption("");
    setQuantity("");
    setCountry("");
    setCosts(null);
  };
  const handleCoverFinishChange = (coverFinish: string) => {
    setSelectedCoverFinish(coverFinish);
    setShippingOptions([]);
    setSelectedShippingOption("");
    setQuantity("");
    setCountry("");
    setCosts(null);
    setPodPackageId(
      data.filter((data: Array<string | number>) => {
        return (
          data[2] === selectedBookSize &&
          +data[3] < pageCount &&
          +data[4] > pageCount &&
          data[23] === selectedColor &&
          data[24] === selectedPrintQuality &&
          data[31] === selectedPaperType &&
          data[25] === selectedBindingType &&
          data[32] === coverFinish
        );
      })[0][0]
    );
  };

  const handleNumberOfCopiesChange = (quantity: string) => {
    setQuantity(quantity);
    setShippingOptions([]);
    setSelectedShippingOption("");
    setCountry("");
    setCosts(null);
  };

  const handleShippingOptionChange = (shippingOption: string) => {
    setSelectedShippingOption(shippingOption);
    setCosts(null);
  };

  const getShippingOptions = async (country: keyof typeof countryList) => {
    setCountry(country);
    setCountryCode(countryList[`${country}`]);
    setSelectedShippingOption(null);
    const response = await axios.post(
      "https://api.lulu.com/shipping-options/",
      {
        currency: "USD",
        line_items: [
          {
            page_count: pageCount,
            pod_package_id: podPackageId,
            quantity: quantity,
          },
        ],
        shipping_address: {
          country: countryList[`${country}`],
        },
      }
    );
    setShippingOptions(
      response.data.filter((f: any) => {
        return f.is_active === true;
      })
    );
  };
  const handleEstimatedCost = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/orders/printJobEstimatedCost",
        {
          pageCount,
          podPackageId,
          quantity,
          city: city.current?.value,
          countryCode,
          postalCode: postalCode.current?.value,
          state: state.current?.value,
          streetAddress: streetAddress.current?.value,
          shippingLevel: selectedShippingOption,
          phoneNumber: phoneNumber.current?.value,
        }
      );

      setCosts(response.data.costs);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLoading,
    isError,
    data,
    selectedBookSize,
    selectedInteriorColor,
    selectedColor,
    selectedPrintQuality,
    selectedPaperType,
    selectedBindingType,
    selectedCoverFinish,
    shippingOptions,
    selectedShippingOption,
    country,
    countryCode,
    countryList,
    quantity,
    fullName,
    streetAddress,
    city,
    state,
    postalCode,
    email,
    phoneNumber,
    costs,
    podPackageId,
    handleBookSizeChange,
    handleInteriorColorChange,
    handlePaperTypeChange,
    handleBindingTypeChange,
    handleCoverFinishChange,
    getShippingOptions,
    handleEstimatedCost,
    handleNumberOfCopiesChange,
    handleShippingOptionChange,
  };
};

export default usePrintBook;
