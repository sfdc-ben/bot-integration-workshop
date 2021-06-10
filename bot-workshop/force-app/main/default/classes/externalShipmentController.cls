public with sharing class externalShipmentController {
    @InvocableMethod(Label ='Get Customer Shipment Details' Description='Get Customer Shipments by Order Number')
    public static list<CustomerShipment> getShipmentDetail(List<String> orders) {
        system.debug(orders);
        String order = orders.get(0);
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://us-central1-bot-integration-workshop.cloudfunctions.net/exampleIntDemo/api/v1/shipments/order/'+order);
        system.debug(request.getEndpoint());
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        List<CustomerShipment> returnList = new List<CustomerShipment>();
        system.debug(response.getBody());
        JSONParser parser = JSON.createParser(response.getBody());
        while (parser.nextToken() != null) {
            if (parser.getCurrentToken() == JSONToken.START_OBJECT) {
                parser.nextToken();
                parser.nextToken();
                system.debug(parser.getText());
                CustomerShipment ship = (CustomerShipment)parser.readValueAs(CustomerShipment.class);
                system.debug(ship);
                returnList.add(ship);
            }
        }
        system.debug(returnList);
        return returnList;
}

    public class CustomerShipment {
        @InvocableVariable
        public string address;
        @InvocableVariable
        public string customername;
        @InvocableVariable
        public string customeremail;
        @InvocableVariable
        public Integer items;
        @InvocableVariable
        public string onlineordernumber;
        @InvocableVariable
        public string orderdate;
        @InvocableVariable
        public string shipmentexpectedtime;
        @InvocableVariable
        public string shipmentactualtime;
        @InvocableVariable
        public string status;

        public CustomerShipment(String address1, String customername1, String customeremail1, Integer items1, string onlineordernumber1, string orderdate1, string shipmentexpectedtime1, string shipmentactualtime1, string status1) {
            address = address1;
            customername = customername1;
            customeremail = customeremail1;
        }
    }
}
