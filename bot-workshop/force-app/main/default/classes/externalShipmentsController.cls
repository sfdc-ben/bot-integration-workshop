public with sharing class externalShipmentsController {
    @InvocableMethod(Label ='Get Customer Shipments' Description='Get Customer Shipments by Customer Email Address')
    public static List<List<String>> getShipments(List<String> emails) {
        system.debug(emails);
        String email = emails.get(0);
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        String encodedEmail = EncodingUtil.urlEncode(email,'UTF-8');
        request.setEndpoint('https://us-central1-bot-integration-workshop.cloudfunctions.net/exampleIntDemo/api/v1/shipments/'+encodedEmail);
        system.debug(request.getEndpoint());
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        List<List<String>> listoflists = new List<List<String>>();
        List<String> returnList = new List<String>();
        if (response.getStatusCode() == 200) {
            JSONParser parser = JSON.createParser(response.getBody());
            while (parser.nextToken() != null) {
                if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) && 
                (parser.getText() == 'onlineordernumber')) {
                    parser.nextToken();
                    returnList.add(parser.getText());
                }
            }
            system.debug(returnList);
            listoflists.add(returnList);
            return listoflists;
        }
        else {
            List<String> error = new List<String>{'No shipments found'};
            listoflists.add(error);
            return listoflists;
        }
    }
}