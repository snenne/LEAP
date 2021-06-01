package com.bavostepbros.leap.domain.service.businessprocessservice;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bavostepbros.leap.domain.model.BusinessProcess;
import com.bavostepbros.leap.persistence.BusinessProcessDAL;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BusinessProcessServiceImpl implements BusinessProcessService {

	@Autowired
	private BusinessProcessDAL businessProcessDAL;

	@Override
	public BusinessProcess save(String businessProcessName, String businessProcessDescription) {
		BusinessProcess businessProcess = new BusinessProcess(businessProcessName, businessProcessDescription);
		return businessProcessDAL.save(businessProcess);
	}

	@Override
	public BusinessProcess get(Integer businessProcessId) {
		Optional<BusinessProcess> businessProcess = businessProcessDAL.findById(businessProcessId);
		businessProcess.orElseThrow(() -> new NullPointerException("Businessprocess does not exist."));
		return businessProcess.get();
	}

	@Override
	public BusinessProcess update(Integer businessProcessId, String businessProcessName,
			String businessProcessDescription) {
		BusinessProcess businessProcess = new BusinessProcess(businessProcessId, businessProcessName,
				businessProcessDescription);
		return businessProcessDAL.save(businessProcess);
	}

	@Override
	public void delete(Integer businessProcessId) {
		businessProcessDAL.deleteById(businessProcessId);
	}

	@Override
	public BusinessProcess getBusinessProcessByName(String businessProcessName) {
		Optional<BusinessProcess> businessProcess = businessProcessDAL.findByBusinessProcessName(businessProcessName);
		businessProcess.orElseThrow(() -> new NullPointerException("Businessprocess does not exist."));
		return businessProcess.get();
	}

	@Override
	public List<BusinessProcess> getAll() {
		return businessProcessDAL.findAll();
	}

}