package controllers;

import static play.libs.Json.toJson;
import models.Contact;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;

public class ContactController extends Controller {
	
	public static Result list() {
        return ok(toJson(Contact.find.findList()));
    }

    public static Result load(Long id) {
        Contact foundContact = Contact.find.byId(id);
        if (foundContact != null) {
            return ok(toJson(foundContact));
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
}
