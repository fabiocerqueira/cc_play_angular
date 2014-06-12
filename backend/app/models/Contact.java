package models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import play.data.validation.Constraints;
import play.db.ebean.Model;

@Entity
@Table(name = "contact")
public class Contact extends Model {

	private static final long serialVersionUID = 1L;
	
	@Id
	public Long id;
	
	@Constraints.Required
	public String name;

	@Constraints.Email
	@Constraints.Required
	public String email;

	@Constraints.Required
	public String phone;
	
    public static Finder<Long, Contact> find = new Finder<Long, Contact>(Long.class, Contact.class);

}
