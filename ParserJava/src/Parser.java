import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

import org.json.*;

public class Parser {

    public static void main(String[] args) {

        try {
            Files.walk(Paths.get("/home/verden/Desktop/RGUHack/xmls/")).forEach(filePath -> {
                if (Files.isRegularFile(filePath)) {
                    parse(filePath.toString());
                    System.out.println(filePath);
                }
            });
        } catch (IOException e) {
            e.printStackTrace();
        }

    }


    public static JSONObject readXML(String path) {
        JSONObject fullJson = new JSONObject();
        try {
            File fXmlFile = new File(path);

            //filename is filepath string
            BufferedReader br = new BufferedReader(new FileReader(fXmlFile));
            String line;
            StringBuilder sb = new StringBuilder();

            while ((line = br.readLine()) != null) {
                sb.append(line.trim());
            }
            JSONObject soapDatainJsonObject = XML.toJSONObject(sb.toString());
            fullJson = new JSONObject(soapDatainJsonObject.toString());
        } catch (Exception e) {

        }
        return fullJson;
    }


    public static void parse(String s) {

        int lastSlash = s.lastIndexOf("/");
        String fileName = s.substring(lastSlash+1,s.length()-4);

        String s2 = s.substring(0,lastSlash);
        lastSlash = s2.lastIndexOf("/");
        s2 = s2.substring(0,lastSlash);
        s2 += "/jsonData/" + fileName + ".json";

        JSONObject fullJson = readXML(s);

        // get 3rd generation
        JSONObject data = (JSONObject) fullJson.get("Root");
        data = (JSONObject) data.get("data");
        JSONArray fields = data.getJSONArray("record");

        JSONArray withContentArr = new JSONArray();

        for (int i = 0; i < fields.length(); i++) {
            JSONObject jsonObject = fields.getJSONObject(i);
            JSONArray jsArr = jsonObject.getJSONArray("field");
            boolean hasContent = true;
            JSONArray fieldNo2 = new JSONArray();
            for (int j = 0; j < jsArr.length(); j++) {
                JSONObject field = (JSONObject) jsArr.get(j);
                if (j != 1) {
                    fieldNo2.put(field);
                }
                boolean hasCont = field.has("content");
                if (!hasCont) {
                    hasContent = false;
                }
            }
            if (hasContent) {
                JSONObject temp = new JSONObject();
                temp.put("field", fieldNo2);
                withContentArr.put(temp);
            }

        }


        JSONArray jsonArrayTrimmed = new JSONArray();
        for (int i = 0; i < withContentArr.length(); i++) {
            JSONObject jsonObject = withContentArr.getJSONObject(i);
            JSONArray jsArr = jsonObject.getJSONArray("field");
            JSONObject trimmed = new JSONObject();

            for (int j = 0; j < jsArr.length(); j++) {

                JSONObject field = (JSONObject) jsArr.get(j);
                String temp = "";
                for (Object str : field.keySet()) {
                    String key = str.toString();
                    if (key.equals("name")) {
                        temp = (String) field.get(key);
                        if (temp.equals("Country or Area")) {
                            temp = "Country";
                        }
                    }
                    if (key.equals("content")) {
                        if (field.get(key).equals("Russian Federation")) {
                            trimmed.put(temp, "Russia");
                        } else if (field.get(key).equals("Egypt, Arab Rep.")) {
                            trimmed.put(temp, "Egypt");
                        } else if (field.get(key).equals("Iran, Islamic Rep.")) {
                            trimmed.put(temp, "Iran");
                        } else if (field.get(key).equals("Yemen, Rep.")) {
                            trimmed.put(temp, "Yemen");
                        } else if (field.get(key).equals("Congo, Dem. Rep.")) {
                            trimmed.put(temp, "DR Congo");
                        } else if (field.get(key).equals("Venezuela, RB")) {
                            trimmed.put(temp, "Venezuela");
                        } else if (field.get(key).equals("Slovak Republic")) {
                            trimmed.put(temp, "Slovakia");
                        } else if (field.get(key).equals("Kyrgyz Republic")) {
                            trimmed.put(temp, "Kyrgyzstan");
                        } else if (field.get(key).equals("Korea, Dem. People’s Rep.")) {
                            trimmed.put(temp, "North Korea");
                        } else if (field.get(key).equals("Korea, Rep.")) {
                            trimmed.put(temp, "South Korea");
                        } else {
                            trimmed.put(temp, field.get(key));

                        }
                    }
                }
            }
            jsonArrayTrimmed.put(trimmed);


        }

        JSONObject withContent = new JSONObject();
        withContent.put("data", jsonArrayTrimmed);


        // try-with-resources statement based on post comment below :)
        try (FileWriter file = new FileWriter(s2)) {
            file.write("var x = ");
            file.write(withContent.toString());

        } catch (Exception e) {
        }

    }

}