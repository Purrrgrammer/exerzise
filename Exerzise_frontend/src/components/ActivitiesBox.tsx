import { useState } from "react";

export const ActivitiesBox = () => {
  const [act, setAct] = useState({
    name: "we have several activies",
    content: "you can see through our tabs on the left side",
    icon: "",
    img: "https://t3.ftcdn.net/jpg/02/78/42/76/360_F_278427683_zeS9ihPAO61QhHqdU1fOaPk2UClfgPcW.jpg",
  });

  const tabs = [
    {
      name: "basketball",
      content:
        "Mollit anim aliqua id velit eiusmod do ad sint anim in duis fugiat excepteur non. Elit fugiat ea dolor et fugiat ea mollit commodo reprehenderit. Ut cupidatat est dolor velit mollit incididunt ullamco fugiat. Incididunt fugiat cillum labore tempor ut.",
      icon: "https://cdn-icons-png.flaticon.com/512/46/46106.png",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeKYVAwe7kW3a3X88L6cX-Tt8K5HTnR83lhg&usqp=CAU",
    },
    {
      name: "baseball",
      content:
        "Quis consequat non ex sint dolore minim quis est eiusmod. Anim pariatur qui voluptate adipisicing nisi et ad mollit consequat. Nostrud consectetur occaecat excepteur ipsum labore duis nisi dolor sunt eiusmod nisi non quis. Sit pariatur sint nisi et qui cillum laborum reprehenderit.",
      icon: "https://cdn-icons-png.flaticon.com/512/694/694625.png",
      img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGRgaGBgaGhgaGh4dGh4aGBoaGhoaGhocIS4lHB4rIRgaJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHDQkISE3NDQ0NDQ0MTQ0NDQ0NDQ0NjQ0NDQ0NDQ0NDQ0NjQ0MTQ0NDQ0NDQ0NDQ0NDE0NDQ0Mf/AABEIAMIBAwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EAEMQAAIBAgMEBQkECAYDAQAAAAECAAMRBBIhBTFBUWFxgZGhBiIyUpKxwdHwExRC4RVDU2JygrLSByNEk6LxFlTCF//EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACcRAAICAAYBBAMBAQAAAAAAAAABAhEDEhMhMVFBBBQiYTJCgXFS/9oADAMBAAIRAxEAPwDgxim9bvAhDGN0d0oAwwZllQZpdl0Y88QPH5yZNon1fEzLYR1aLKh6kuzaTahHA9jflJP0z1+BmIrx7xZEPWl2bI2qOZ7hDG0x63h8pgkRAwyIetI6Fdoj1h4wxjxxI75zyOY/2hiyIevLpHSDFg7svtCIux4Tmc8u4XFcDE4D9w+jXLnke6MX6JVD8jHFU8z3yco/cfRPn6IYqCVftW5mN9sefhDKP3C6L4qrCVxM/wC2P0BG+2PRDKw9xH7NIOsIKDxmWMQeQhfeTyHfFlY9aJpNQvukTYYzNG0rb1/5flDXafQe8QysrWj2TYiyC7mw59hPuBj0MWCrKqqFfK5sCLEaqVv6wJPSJGNpIRxv1D5w8t1DAAqff0jnKTyoalGT2YamWMdSrrRAUE067egPximVspUHMRn49dpRDAcO6VaWIrU2V6fpCpcWPnBQbqfO80HcLC9rdIlYTyysWIrVGzj8Sajl2pim+51Vcq5xvIX8PSOYMrLTip41nuxJJYknMLG5JJv2kywrXMiTuTZUdkkAUl3Y2ju/7OlUYdZUovi4lastuB8JpJVopQfI7F3VFZGSwGodgr5tQCtt0I82OT2oxFSXcPTI1Jk2z6AqOiCwLHfbcACSe4Rw9lZuQJ7heAWcvXXMzHmTw6Yo9opocJjAwwbwbQgJYBCMRCEUCQYYaCYlgAd4LmGIxWAAZoQMApFACSDmIjoY9oAXcNib798shpjgWN5doVb/ACktAy7GPORq0MmIQxfojg3jMDBAMBDkRs1oYW8WThAChX0PXrAzSxi6el5SVo0USyfC41k6RxU+/oPTKwa/GOYVY02naOgpVEf0Dr6p39nPsgOhG8TBMsU8c68bjkdfzkuHR0Rx/wDpGqG6JZov0CZdLaQ/EncfgRLlLaNL99etQfcZDi+jVYsX5DqG53maLUstBCTq7udeASwHTvJ7pTpvSdgFbUmwGU75vbTwlhSS9slJb/xOS9/+QhwmO06or7BpAM7jelKowPSVyD+qVseMlFyDwsO3T4+E1sBh8tOseYSn3tnPgkzdtkClbmyj4/CHSFLhs5zXl7oo9hFNDhMSIQ1ELLLAAGEBHCXky0hFYEJW8bLLBQRrQsCBRCCwwIWWAERSAUk9oNoARBYVo8bNGAxEdCQY+aNeAF2jUBlhWmWlTKZepveQ0BaAvBZeMdH4cYW/5RCIVbpj5x2xiI5SMAXAItMt0sTNSVcUmt7b4IEVLco4MREG8sZJAJiDQoACGhq0jKxCAG75MUM9dQOAJ7T5o/qnUbdqXxD23Bgo6kAX4TM/w+pA1S53Ar3Ldz7hLbPmcsd5JJ75jNnZgrYurUK4UHi9Zu5EA97zF21UuqA9J7h+c2dqtlo0EI1yM/a7n4KJzm1G85RyX42+EX7IMR/B/ZS7YotOcU0OMylhEQRCvKAe0e8QktCgXYKouSbAQAAAcvrskyYZ24E8rTsNleTSJZqhzMLHKPRHX602BhrG6lUXkqKD2GZOaNo4EnzscLhvJ/EObJSduoS0vktieKqOgsL+E7dXsN/Re9r90TVABcsB0ak9wBt22k55Pg00IrlnFnyTxH7h/m/KBhtiKtYpiaopoKRqZkAc5swAp2uPOOp47rcZ2lHE5uFuu3hIDs81B/mOFZXdlcKCcoByJ528eje/q9s0wp71IUsGNWjg9obNyXKMXQW84pkNjazAAsGXW2YHuuJmMpnrQRMmTIpCoQAoUAkDzcy2t0Ei1wejXExfk7SqKGVPs3tewIsCRuNrjtEbmk9uCNF+OTz60REv7QwTUnKNvEoWlJ2ZNUCywqVTKejjGzRmEBGoj3EkUzLovl6poI0loRMYIEJGBjkRCIWEhr6jxlspeQ1EghmYYzCO4IJEQ1mgyMQg0ciMYAEDDyyNTCUxAdx5IqEw9V93mOe1stMf1GVqWIA7pq0KQTAkW1Y007QC7eOWUcFhld0W3pOi95AmMt6O+CqJe8o6yioEt6CU17kBPiTOVxz3cnoA+u+bW2KmfEVW4Go9uoMQPACYOIN2b+I+Ea/JmeNtBIa45xQIpZyGWDHVomEWWWAamb3kwyiupJHEDrI0nPgyxRqEdmsiStUOLytM9UinI7M8pyLLUGYesN/aOM36G1qL7nUdB833zncWjujiRlwy9aMEESMDuIPVCiLI3WYeGwVUZWepWdipWohcIFzrYvTKrbMupHdcb50JEjeoq72UdZAlRk48EtJ8lKlgXJUNXqFVNx6Ks3LO6i7AcrDpvNId8z6u1qK/jB6BrMfaPlEbWQW6d5hlciZYkY+SDyuqKXAGpC2PfOUqSzVrljdjcmVmE3iqRxzlmdkbHWIRMsEGUSFeT4d9bcJWBhrBgaYWSK3OUqFbSx7JZBkUInUQaiR6fSSNNNL69Oug+rQ23QAysUm498rCauIp3BEySe+UhoMwSsYtCzRgNJ8JTzOi82UHtMhmjsJL1ktwue7T4iKTpFRVySO32yctGit/SLue8KP6ZF5Opeuh4Lmc/wAilvhI/KGoc6J+zpIvaRnPi0sbCrKoqMWFxSZVHEs2lh2XmX7L6O79f9M58Ib5mO/U9s52/Hn8Z0OOxJysd2h1nPLHDyYeofCGy9cUV4pZzFJqZkdrTRFMQWQcoWBnmGhkz0Bw0gfYER2A94lcwIg0AJUrsNxI6jJhj34O/tN85UaMBCh2y42Kc73c9bGQs5Otz26yEGGrQoQf2pH5Rvtid8G8AjthQBufoRg0YGEDeAAMIssMiAW1jAYp+Ua0IOISkGAAAS7h3vod8q6cfCOrWMTA0RJg0rUambdJVFuqSIVQTMxNLWaV79Ur4pLi/KNMDMZINpLBIlDGUzpfI7CZ6h6cq+0fynNgTufIRQvnncCznqRSfeJMujTC/K+httvnxFRuGcgdSnKPASTA0RbWZzVbnXnvlpMV5tphJ27O9KlQe1LfZv2d5IE5szYx9XzLc2+BMyXB39E0hwcWO/kBc8/dFFaKWYhUmkpEzadQMLg7pYSraKhuLRYamOUgZYQrRy5jJAyRjSU6+6FFACBqMjdCN8uEQW0hYylaOJOyLIinTHYCEWWIXG+FeAELb4lYyUwSOiMBg0cyNpJTiAHLBlhlgtACEXjwisFkjAlo1SpvNBKlxeZiC0mouQb8OUloDSVeEhqpw5w0a+4wyt4hGI6kGDeW8TTAbdvlfLqZSYwVnoHk/TyYWo1v1WXtqsB7iZwdNCSAOJt3z0bEEJhSo/FURf5UUn3kSZPc3wVz/DDFDWEcMRJcO5ueyT1K/CYHYY+0BbILg7z7pSYy3tP0h/CPeZUIm0eDgxnc2DYRR4pRmYeHcBiBvB3EX93GXVsRoTpr9dErthyDn4k/DfCUX4G9r6wZ114ZMrHluhCrBRr2BNjf6vHcDlAwnHKxzWhq45yK0ijozL6PDImeGtzkiVzuioC4aMj+zgJWkgqgw3AFqcAU+BElFUQ0cQArHDX3GA9Ejh8ZpLaOUHRDMIx7RKDNOpQBkJwo4eMMwWVlbnEW5SRqJEApaMYwMWWFaPlgANoAMMi8mXCsdy/XXFY0m+AsNUtpwM0EW8pJgW4kDvJ+UuUEyi2Ynw+clyRawZvwVsbS0vymbab7up4Hv/KVThk9WCmil6eRBsmhmrILfiB7F1+E7jao/wAqgvMPUP8AM1ge5Zy+Cyo11GtrdhnX7SIDKvFERLfygnxJkt2mzaEHGkzLoUtbmAVF9BDrsZEhNwde4/CZm5k7Sf8AzG6lHgPnKbG8ubQRw7EqQpOhtpbhrulTfNk9jzp3mdkbVYpDUTU/KNK2JKmuQdAtr0GR06hL2O7W31yhPVOW+ljY26eP10wXddCRbl0fXxgdjZOo1Bvod8tMBa/LplVd2m7QjqnQbLw1Nhd1LLYXsbG/cYm6FKOZUYeYdPv+EYqDxPd+c61tlYU7ldepgfgJC+w8Pweov8ikf1wzox0ZHKlP3vA/KNl6R7vfOoHk1SO6vb+JCP6QYL+S6/hr0+0OPeojzINKXRzYU9HePnCAbke6b48lH4VaXtqP6jAbyWrcDTPVUQ+4mO0Tpy6MBh9GGrTXPk3iRuRj/Dc+6RNsTErvpv2j5w2Fll0UVrmTJXifBVRvQ9w+ED7Jx+Bu4xbCcX0Wkqx84lYab19498EkfR/KKiaLZIiNIHfKg7e/8pKjnmYUMdsOOElo4Fm1bzV5nj1DjLmz8ISM7DTgDxI+ELEqSZEpPg6MLBzbyIEponoi55nf8oT1SeMiI6Ysv1/3J3Z1xjGPA5aOBABENAeEKHZGEbNvuDbTQWOguCdLc4bAjeLdctDCki/fLNJmpIblCh1Ie5HWqix3jq3844xcnRLmoq2VNl0s9VE9Z0HtH5Xmtj8f/nVDqbu1uoE28LSTYrirXp1RQSmUDkMBbMQul1BAHLnY6wX2NVYXzUy+vmA+cf5rZSegGVKNKkycybv6K4xinffv98lGKAlT7oVNnBUg7iLCTV6QAtqOozOirJvvQP4byviMLTbWwHSND4Sk5tIGcwSBpPkl/Ra8KngYpF9qYpVsjRh0cuji1juGgBH1aGxJ05WOsKwvrv1HXcWgFjYadvhNjIkw623btdOY4zf2PXXLlOluZ33nPofOtzGvzlzDqbG1+iTJWPM47o6xcttGB6iPnI3B4XnOBG9Uxwr8j3SNP7Frtco6JUbpiLvumCDUHrjqzRxiqg/E1+kn4w02HuF0a7O0QqnjM5cXXHrezf4R/v1TivekNORS9RE0BWI3fCWqW03GgYjq090xl2i3FF7j8452rzQd/wCUWWSHrQZ0H6Xf13t/ET7zEdpMQbtfrVT7xMNdqr6njCG0UPA+HzhUx6mG/JsLtIcQn+2nwAhDFId6Uj/K3waY33pDreSLXQw+Q82G/JtIcOd9Gn2Fh7yYTYTDt+p7nA/+Jk0jTJ9MDwmhSyWsHUnrEVsKgy4mHpj1wOV1YDssJHUwdNtzv7Cn3PHC7uqEzgbzaLMXRnVNjrwqL2o49wMFdjD9on/Mf1KJd++rDWqh42J5wzfQb9mSdkkXF1OvB1+csU9muB5qMx6ADbxtImw4zHXW/LSbuH2irgLUARgNGUWQ9aj0esd0pUyW2jGqYRkUs7BAOBB1PLQWEqYbFuUu4RkC5jnW5UE2G8W1032nTY3DF0KlioYEZkPA8VbcZiYDCUqC1aDu7/afZkBgxuqltLroACBp0zTDklZlO3Ru4cO9NHZcisBla1kN/VHCVsfWdEYqmZuHIc2Oo0Al77zmRUDaDchOmnqjqvKOMqupVxY0xfOACX3aEDkN54zPay96B2jthEKJUQur38+9iiqL3Bsb79x06pmbKxlKu1QIrWRrHNpcG4BFj+7ulw41qqH7pkqmkGJDMQoXL6IBFqi3yMF3eYOicHUxVVajszFXZy7MNAWY3Jsvm2vwGk6HhRcF2ZZ2pfR2GJwii9u6UalArLH2pdVYEHML6fC/CQu1t3bfxnMdCK+n1aKDfoigWccjcSd3PpkpNh0Ee/hM/PJftSeyddHBZoYdwx6bWtL6LpMNW1vxnQYbDs6KwsbgHePdJlEM9IiIjndLH3F/V8R84dPAuD6JiMindhzhKx3y990f1D3SOpRYWup1IA0374WBAMU4/G3tGSptGqN1Rx1Ow+MM4Z/VbugVKDW9E9xjzMVIX6Trftantt84v0jV/aOetjIjSbL6J38jJSgy7teo3hbATbQqeue0A+8Rvvj+sD/KvxEKnTFtbX8Ysg5RNsKBGMbmvsJ/bHGMb9z/AG0/tjGkOURpDlAZL98a3op7C/KN97PqJ7PyMj+zEQpj6MQjc2VtEkZSBf8ADy6tTLOJxec5bWK2v2/9Gc05sBbmZcweKBZs51OUBuocR2zKUeWdWFjcRkaJU9kHMbxFyt7/AJGV3eZHWXFxB4jouOoc5ao1b3G8W6PfMxanMay9QqqN/dKJaL+GruBYMMvK/Hd2SxXq5d4BuOuUWrKd1vrqlWrfeT1b4WTRoJiMpuAAbb7azQFfMAQOs/lOfoVLn/vxmjTrFeO/u74BRg7eQ0g2VMhqM4Lq+pQjcEAFhv1uT5xGgNpyuFq+eS7ZABbRcxGu7KSO3eRy5d9tLCJXy58wKE2Km2hIJUjjfKOnxkNPZGGQ3FJb3v512t1Ztwm6xvjTMnhNsz/J0LUpuM2ZldtQCAVb0Tbhou7pmhXwnAW6+MsKiIWyKqFrXy8baAm3GMzdImUnbs1iqVFL7ofW8YpJfoiiKs8svCDQIp2nATB53fk75J4rEYdKtIIUbMBeoqt5rFTcHdqDPPwZubNxLBAA1tT74mJnbf8AgO0P2aHqqJ84j5C7QH6g9lRP7pyy45/XMmTatUbnbvk7C2N//wAO2gP9O/Yy/wB0iPkrj/8A16unRx6NZlpt3EDdVf2m+c0MNt6sbXxNVN5azMbKL2tr1cYUmGw7eT2PH+nr+yx90jfZeOG+hiP9t/lJcR5V4lT5mJqEWFz9o2/viXy0xg/1D+0fjD4hSKrYbGD9VXHXTf5QGOJG9Kg60b4iaS+XWNH65u8fESVf8Q8cP1ngp/8AmGwUjG++Vxvzdq/MR/0i/E96j5TeX/EjG8WU9aJ/bDH+I+J4rTPWiwpCpHPDaT/u+yI42k3qp7InQ/8A6HV/FQoN10x84Q8v7+lhMMeukPnCl2Ojnf0l+4nsxHHg/q6fdOpPlQpIB2fhWzAm4QDcL68pDV8qMKCQ+zqGmnm6dxtBxXYqOVqVc1vNA6BI6XHnm9wE19vrTujIgp5sxyre1juGvLnMSi2/+IyZRq0CZew+JZdL6cuHjLDYpdxBHVqO46zOvALW/wC5m4plxxJR4ZoXF9DeOWMzcx1kq1yOMWU3j6jtGlSqG8vpiBYXmCMYw5d0kGP5rftkuLLWPFm2mTeTaSGrl3TC++ccp75Ku0k4o3tRZGPWh2awxF+Ed2B4fXXMk7UQbkPtflHbaRtooHTeGVi1o9l8kxZr/EfW6ZL41rcO75yriMSxG8ntNu6NRZLx4+Ebf26c17xFOWznoil5Cdd9HNR4op0mIpqbO9A9fyiiilwJl8RxFFIJFEsUUAGMRiigASwuMUUAGWE0UUAFF9eMUUADpVWsPOOh0164q3GKKNjZsbd3J/CfcJi0ePWY8UeJ+T/hC4JW3d0hiimRQk4wkiijAfjDWKKIBn3QecUUAB4ydYoomA7SseMUUEURxRRSwP/Z",
    },
    {
      name: "fitness",
      content:
        "Eu cupidatat incididunt et amet ut anim laboris ad mollit eiusmod irure aliqua minim. Ex nisi in exercitation do mollit sint. Nisi occaecat occaecat minim pariatur fugiat ullamco id dolore. Nisi Lorem occaecat cillum dolore Lorem veniam officia anim anim esse. Ullamco non ea fugiat eu occaecat esse irure non amet excepteur in minim eiusmod non. Enim amet deserunt qui in.",
      icon: "https://uxwing.com/wp-content/themes/uxwing/download/fitness-gym-yoga-spa/weightlifting-icon.png",
      img: "data:image/jpeg;base64,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",
    },
    {
      name: "soccer",
      content:
        "Culpa enim pariatur tempor ex fugiat qui dolor Lorem cupidatat incididunt adipisicing commodo qui. Laborum voluptate ipsum ad sit ad ea velit et nostrud amet mollit. Aliquip eu excepteur cupidatat ullamco incididunt nulla quis non occaecat adipisicing do commodo eu. Ex incididunt non cillum id deserunt.",
      icon: "https://cdn-icons-png.flaticon.com/512/53/53283.png",
      img: "https://www.progressivesoccertraining.com/wp-content/uploads/2023/11/how-long-should-soccer-practice-be.jpeg",
    },
    {
      name: "football",
      content:
        "Culpa dolore ea ex sunt ipsum minim id amet id esse officia. In excepteur do culpa irure incididunt minim. Ex qui id irure incididunt mollit duis cupidatat ad nostrud irure et proident eu nostrud. Laborum sint elit id culpa enim occaecat veniam ut ut. Ullamco elit nulla fugiat deserunt laboris id aliquip officia exercitation voluptate ut labore. Magna dolor consectetur occaecat pariatur eiusmod dolore id consectetur officia Lorem magna sit adipisicing proident. Nisi mollit ad laborum irure esse sint laboris proident ex labore laborum do.",
      icon: "https://cdn-icons-png.flaticon.com/512/212/212850.png",
      img: "data:image/jpeg;base64,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",
    },
  ];
  return (
    <div className="flex flex-col w-[350px] md:flex-row justify-center h-[800px] md:h-[400px] md:w-[1000px] mx-auto my-10 md:my-0">
      <div className="w-full bg-slate-200 text-center p-4 relative z-3">
        <div className="tabs-container absolute flex justify-around gap-x-1 top-[-30px] left-[12%] md:top-0 md:flex-col md:left-[-30px] md:h-[400px] ">
          {tabs.map((el, index) => (
            <div
              onClick={() => {
                setAct(el);
              }}
              key={index}
              className={`tab cursor-pointer flex items-start md:items-center h-[80px] w-[50px] hover:-translate-y-3 md:h-[50px] md:w-[100px] md:hover:-translate-x-12 md:hover:-translate-y-0 ${
                el.name === act.name ? "bg-red-200" : "bg-slate-100"
              }`}
            >
              <img
                src={el.icon}
                alt=""
                className="h-[20px] mt-3 mx-4 md:mt-0"
              />
            </div>
          ))}
        </div>
        <div className="w-full h-full bg-red-200 p-4 relative">
          <header className="text-xl">{act.name}</header>
          <div className="h-[200px] md:h-5/6 md:mt-4 bg-slate-200 overflow-hidden ">
            <img
              className="w-full object-cover hover:scale-125 transition duration-500 cursor-pointer"
              src={act.img}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-red-200 text-center relative">
        <header className="p-4 md:p-10 h-[300px] ">{act.content}</header>
      </div>
    </div>
  );
};
