const xmlToJson = (xml) => {
    // Создаем объект результата
    let obj = {};

    if (xml.nodeType === 1) { // элемент
        // Если у элемента есть атрибуты, добавляем их как свойства объекта
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let attribute of xml.attributes) {
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType === 3) { // текст
        obj = xml.nodeValue;
    }

    // Обрабатываем дочерние элементы
    if (xml.hasChildNodes()) {
        for (let item of xml.childNodes) {
            let nodeName = item.nodeName;
            if (typeof obj[nodeName] === "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (!Array.isArray(obj[nodeName])) {
                    let old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};

// Пример использования
const xmlString = `
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>`;

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "text/xml");

const json = xmlToJson(xmlDoc);
console.log(json);
