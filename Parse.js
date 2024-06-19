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
<data><load_status>2</load_status>
<elements_object>
<guid>12319cf6-8983-43f2-b9f0-c156bb410090</guid>
<name>Zaex 109</name>
<classifType>1f8174ea-7124-463e-8ba2-befa6fec41ad</classifType>
<address>192.168.56.109</address>
<changeInterval>b5e74cd8-2872-474b-ace8-1a6d2b5ccf8a</changeInterval>
<elementTemplate>6fe6fbdd-dcc4-4faf-a508-fd03aaa3876b</elementTemplate>
<accessGroup>b2ffc6f1-a95f-4aea-b3f9-cc0785b2e8c4</accessGroup>
<logicalGroup></logicalGroup>
<isEnable>1</isEnable>
<elementState>3</elementState>
<potentialState>0</potentialState>
<potentialStateCount>2</potentialStateCount>
<server>astrakuf</server>
<metadata></metadata>
</elements_object>
<elements_object>
<guid>20e7f7ad-00b8-4dc7-b242-3579edfeb3c3</guid>
<name>newone</name>
<classifType>1f8174ea-7124-463e-8ba2-befa6fec41ad</classifType>
<address>192.168.56.1</address>
<changeInterval>b5e74cd8-2872-474b-ace8-1a6d2b5ccf8a</changeInterval>
<elementTemplate>5b83cd7a-d612-4e83-826f-8117a766fad2</elementTemplate>
<accessGroup>cd0d1294-3e64-4123-b8a1-20966db26d0e</accessGroup>
<logicalGroup>4b319296-b681-4c19-8301-b37e1d6e2fa2</logicalGroup>
<isEnable>0</isEnable>
<elementState>1</elementState>
<potentialState>0</potentialState>
<potentialStateCount>2</potentialStateCount>
<server>astrakuf</server>
<metadata></metadata>
</elements_object>
<elements_object>
<guid>7420aaff-59f8-4b74-878d-2fc7215bb918</guid>
<name>ASTRA KUFf</name>
<classifType>1f8174ea-7124-463e-8ba2-befa6fec41ad</classifType>
<address>192.168.56.101</address>
<changeInterval>b5e74cd8-2872-474b-ace8-1a6d2b5ccf8a</changeInterval>
<elementTemplate>6fe6fbdd-dcc4-4faf-a508-fd03aaa3876b</elementTemplate>
<accessGroup>b2ffc6f1-a95f-4aea-b3f9-cc0785b2e8c4</accessGroup>
<logicalGroup>08c97ce5-d7ae-4a42-a88b-ff549db5d5a4</logicalGroup>
<applicationTemplate>0988b4d5-4336-4756-afd4-70ecdf0ae74a</applicationTemplate>
<applicationTemplate>5c7147a7-c57d-47d8-99d7-edbb9d24eccf</applicationTemplate>
<applicationTemplate>dfa9a1c1-fe61-4387-92c8-cedbbfeb7aca</applicationTemplate>
<isEnable>1</isEnable>
<elementState>4</elementState>
<potentialState>0</potentialState>
<potentialStateCount>2</potentialStateCount>
<server>astrakuf</server>
<metadata></metadata>
</elements_object>
<elements_object>
<guid>961b41df-0572-459d-972f-b66157fb9345</guid>
<name>KUF DB</name>
<classifType>1f8174ea-7124-463e-8ba2-befa6fec41ad</classifType>
<address>192.168.56.105</address>
<changeInterval>b5e74cd8-2872-474b-ace8-1a6d2b5ccf8a</changeInterval>
<elementTemplate>268ab9f8-1a9d-44c7-a8f6-0fc931be401f</elementTemplate>
<accessGroup>b2ffc6f1-a95f-4aea-b3f9-cc0785b2e8c4</accessGroup>
<logicalGroup>4b319296-b681-4c19-8301-b37e1d6e2fa2</logicalGroup>
<applicationTemplate>c39e1773-9f4a-4466-b896-695bfc3c3b2d</applicationTemplate>
<applicationTemplate>0988b4d5-4336-4756-afd4-70ecdf0ae74a</applicationTemplate>
<isEnable>1</isEnable>
<elementState>3</elementState>
<potentialState>0</potentialState>
<potentialStateCount>2</potentialStateCount>
<server>astrakuf</server>
<metadata></metadata>
</elements_object>
<elements_object>
<guid>be3fd861-ec97-430f-8c63-f27392948567</guid>
<name>DIMA LIM</name>
<classifType>1f8174ea-7124-463e-8ba2-befa6fec41ad</classifType>
<address>172.16.135.35</address>
<changeInterval>b5e74cd8-2872-474b-ace8-1a6d2b5ccf8a</changeInterval>
<elementTemplate>6fe6fbdd-dcc4-4faf-a508-fd03aaa3876b</elementTemplate>
<accessGroup>cd0d1294-3e64-4123-b8a1-20966db26d0e</accessGroup>
<logicalGroup>4b319296-b681-4c19-8301-b37e1d6e2fa2</logicalGroup>
<applicationTemplate>a1cc8482-4895-42d6-9e61-728c38d2e32b</applicationTemplate>
<applicationTemplate>0988b4d5-4336-4756-afd4-70ecdf0ae74a</applicationTemplate>
<applicationTemplate>5c7147a7-c57d-47d8-99d7-edbb9d24eccf</applicationTemplate>
<applicationTemplate>7d26f3f6-5e67-4144-9408-49814b76f8b2</applicationTemplate>
<isEnable>1</isEnable>
<elementState>3</elementState>
<potentialState>0</potentialState>
<potentialStateCount>2</potentialStateCount>
<server>astrakuf</server>
<metadata></metadata>
</elements_object></data>`;

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "text/xml");



const json = xmlToJson(xmlDoc);


const constructs = 
   [
        {
            id:0,
            title:"АПК МД АСРС",
            lines:[
                {
                    address:1,
                    color:"green"
                },
                {
                    address:2,
                    color:"green"
                },
                {
                    address:3,
                    color:"green"
                },
            ]
        },
        {
            id:1,
            title:"АПК МД Визит",
            lines:[
                {
                     address:0,
                     color:"green"
                },
                {
                    address:2,
                    color:"green"
                },
                {
                    address:3,
                    color:"green"
                },
            ]
        },
        {
            id:2,
            title:"АПК МД Церий",
            lines:[
                {
                     address:0,
                     color:"green"
                },
                {
                    address:1,
                    color:"green"
                },
                {
                    address:3,
                    color:"green"
                },
            ]
        },
        {
            id:2,
            title:"АПК МД Рябина",
            lines:[
                {
                     address:0,
                     color:"green"
                },
                {
                    address:1,
                    color:"green"
                },
                {
                    address:3,
                    color:"green"
                },
            ]
        },

   ]






