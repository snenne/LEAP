package com.bavostepbros.leap.domain.service.capabilityservice;

import java.util.List;

import com.bavostepbros.leap.domain.model.Capability;
import com.bavostepbros.leap.domain.model.capabilitylevel.CapabilityLevel;

/**
 *
 * @author Bavo Van Meel
 *
 */
public interface CapabilityService {
	Capability save(Integer environmentId, Integer statusId, Integer parentCapabilityId, String capabilityName,
			CapabilityLevel level, boolean paceOfChange, String targetOperatingModel, Integer resourceQuality,
			Integer informationQuality, Integer applicationFit);

	Capability get(Integer id);

	List<Capability> getAll();

	Capability update(Integer capabilityId, Integer environmentId, Integer statusId, Integer parentCapabilityId,
			String capabilityName, CapabilityLevel level, boolean paceOfChange, String targetOperatingModel,
			Integer resourceQuality, Integer informationQuality, Integer applicationFit);

	void delete(Integer id);

	boolean existsById(Integer id);

	boolean existsByCapabilityName(String capabilityName);

	List<Capability> getCapabilitiesByEnvironment(Integer environmentId);

	List<Capability> getCapabilitiesByLevel(CapabilityLevel level);

	List<Capability> getCapabilityChildren(Integer parentId);

	List<Capability> getCapabilitiesByParentIdAndLevel(Integer parentId, CapabilityLevel level);
}
