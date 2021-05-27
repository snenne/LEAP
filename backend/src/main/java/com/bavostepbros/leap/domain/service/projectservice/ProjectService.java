package com.bavostepbros.leap.domain.service.projectservice;

import java.util.List;

import com.bavostepbros.leap.domain.model.Project;

public interface ProjectService {
	Project save(String projectName, Integer programId, Integer statusId);
	Project get(Integer projectId);
	Project update(Integer projectId, String projectName, Integer programId, Integer statusId);
	void delete(Integer projectId);
	List<Project> getAll();
	List<Project> getAllProgramId(Integer programId);
}
