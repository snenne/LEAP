package com.bavostepbros.leap.domain.customexceptions;

public class DuplicateValueException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public DuplicateValueException(String message) {
		super(message);
	}

}