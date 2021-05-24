package com.bavostepbros.leap.domain.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Technology {
	
	@Id
	@GeneratedValue
	@Column(name = "TECHNOLOGYID")
	private Integer technologyId;
	
	@Column(name = "TECHNOLOGYNAME", unique = true)
	private String technologyName;
	
	@ManyToMany(mappedBy = "technologies")
	private Set<ITApplication> itApplications = new HashSet<ITApplication>();
		
	public Technology(String technologyName) {
		this.technologyName = technologyName;
	}
	
	public Technology(Integer technologyId, String technologyName) {
		this.technologyId = technologyId;
		this.technologyName = technologyName;
	}
}