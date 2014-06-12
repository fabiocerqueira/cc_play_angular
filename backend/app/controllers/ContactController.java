package controllers;

import static play.libs.Json.toJson;
import models.Contact;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;

public class ContactController extends Controller {
	
	public static Result list() {
        return ok(toJson(Contact.find.findList())).as("application/json");
    }

    public static Result load(Long id) {
        Contact foundContact = Contact.find.byId(id);
        if (foundContact != null) {
            return ok(toJson(foundContact)).as("application/json");
        }
        return notFound();
    }

    public static Result create() {
        Form<Contact> ContactForm = Form.form(Contact.class).bindFromRequest();
        if(ContactForm.hasErrors()) {
            return badRequest(ContactForm.errorsAsJson()).as("application/json");
        }
        Contact newContact = ContactForm.get();
        newContact.save();
        return ok(toJson(newContact)).as("application/json");
    }

    public static Result delete(Long id) {
        Contact foundContact = Contact.find.byId(id);
        if(foundContact != null) {
        	foundContact.delete();
            return ok();
        }
        return notFound();
    }

    public static Result update(Long id) {
        Form<Contact> ContactForm = Form.form(Contact.class).bindFromRequest();
        if(ContactForm.hasErrors()) {
            return badRequest(ContactForm.errorsAsJson()).as("application/json");
        }
        Contact updatedContact = ContactForm.get();
        updatedContact.update(id);
        return ok(toJson(updatedContact)).as("application/json");
    }

    private static Result allowCORS() {
        response().setHeader("Access-Control-Allow-Origin", "*");
        response().setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response().setHeader("Access-Control-Max-Age", "300");
        response().setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return ok();
    }

    public static Result option() {
    	return allowCORS();
    }

    public static Result optionID(Long id) {
    	return allowCORS();
    }
}
