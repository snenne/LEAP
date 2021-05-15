package com.bavostepbros.leap.domain.service.statusservice;

import java.time.LocalDate;
import java.util.List;

import com.bavostepbros.leap.domain.model.Status;

/**
*
* @author Bavo Van Meel
*
*/
public interface StatusService {
	Status save(LocalDate validityPeriod);
	Status get(Integer id);
	Status getByValidityPeriod(LocalDate validityPeriod);
	List<Status> getAll();
	Status update(Integer statusId, LocalDate validityPeriod);
	void delete(Integer id);
	boolean existsById(Integer id);
	boolean existsByValidityPeriod(LocalDate validityPeriod);
}
