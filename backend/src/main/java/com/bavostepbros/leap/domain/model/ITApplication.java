package com.bavostepbros.leap.domain.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ITApplication {

    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    @Column(name = "ITAPPLICATIONID")
    private Integer itApplicationId;

    @OneToOne
    @JoinColumn
    private Status status;

    @Column(name = "NAME")
    private String name;
    
    @Column(name = "VERSION")
    private String version;
    
    @Column(name = "PURCHASEDATE")
    private LocalDate purchaseDate;
    
    @Column(name = "ENDOFLIFE")
    private LocalDate endOfLife;
    
    @Column(name = "CURRENTSCALABLITY")
    private Integer currentScalability;
    
    @Column(name = "EXPECTEDSCALABILITY")
    private Integer expectedScalability;
    
    @Column(name = "CURRENTPERFORMANCE")
    private Integer currentPerformance;
    
    @Column(name = "EXPECTEDPERFORMANCE")
    private Integer expectedPerformance;
    
    @Column(name = "CURRENTSECURITYLEVEL")
    private Integer currentSecurityLevel;
    
    @Column(name = "EXPECTEDSECURITYLEVEL")
    private Integer expectedSecurityLevel;
    
    @Column(name = "CURRENTSTABILITY")
    private Integer currentStability;
    
    @Column(name = "EXPECTEDSTABILITY")
    private Integer expectedStability;
    
    @Column(name = "COSTCURRENCY")
    private String costCurrency;
    
    @Column(name = "CURRENTVALUE")
    private String currentValue;
    
    @Column(name = "CURRENTYEARLYCOST")
    private Double currentYearlyCost;
    
    @Column(name = "TIMEVALUE")
    private LocalDate timeValue;
    
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "ITAPPLICATION_TECHNOLOGY", 
    	joinColumns = {@JoinColumn(name = "ITAPPLICATIONID")}, 
    	inverseJoinColumns = {@JoinColumn(name = "TECHNOLOGYID")})
    private List<Technology> technologies;
    
    public ITApplication(Integer itApplicationId, Status status, String name, String version, LocalDate purchaseDate,
			LocalDate endOfLife, Integer currentScalability, Integer expectedScalability, Integer currentPerformance,
			Integer expectedPerformance, Integer currentSecurityLevel, Integer expectedSecurityLevel,
			Integer currentStability, Integer expectedStability, String costCurrency, String currentValue,
			Double currentYearlyCost, LocalDate timeValue) {
    	this.itApplicationId = itApplicationId;
		this.status = status;
		this.name = name;
		this.version = version;
		this.purchaseDate = purchaseDate;
		this.endOfLife = endOfLife;
		this.currentScalability = currentScalability;
		this.expectedScalability = expectedScalability;
		this.currentPerformance = currentPerformance;
		this.expectedPerformance = expectedPerformance;
		this.currentSecurityLevel = currentSecurityLevel;
		this.expectedSecurityLevel = expectedSecurityLevel;
		this.currentStability = currentStability;
		this.expectedStability = expectedStability;
		this.costCurrency = costCurrency;
		this.currentValue = currentValue;
		this.currentYearlyCost = currentYearlyCost;
		this.timeValue = timeValue;
	}

	public ITApplication(Status status, String name, String version, LocalDate purchaseDate,
			LocalDate endOfLife, Integer currentScalability, Integer expectedScalability, Integer currentPerformance,
			Integer expectedPerformance, Integer currentSecurityLevel, Integer expectedSecurityLevel,
			Integer currentStability, Integer expectedStability, String costCurrency, String currentValue,
			Double currentYearlyCost, LocalDate timeValue) {
		this.status = status;
		this.name = name;
		this.version = version;
		this.purchaseDate = purchaseDate;
		this.endOfLife = endOfLife;
		this.currentScalability = currentScalability;
		this.expectedScalability = expectedScalability;
		this.currentPerformance = currentPerformance;
		this.expectedPerformance = expectedPerformance;
		this.currentSecurityLevel = currentSecurityLevel;
		this.expectedSecurityLevel = expectedSecurityLevel;
		this.currentStability = currentStability;
		this.expectedStability = expectedStability;
		this.costCurrency = costCurrency;
		this.currentValue = currentValue;
		this.currentYearlyCost = currentYearlyCost;
		this.timeValue = timeValue;
	}

	public ITApplication(String name, String version, LocalDate purchaseDate, LocalDate endOfLife,
			Integer currentScalability, Integer expectedScalability, Integer currentPerformance,
			Integer expectedPerformance, Integer currentSecurityLevel, Integer expectedSecurityLevel,
			Integer currentStability, Integer expectedStability, String costCurrency, String currentValue,
			Double currentYearlyCost, LocalDate timeValue) {
		this.name = name;
		this.version = version;
		this.purchaseDate = purchaseDate;
		this.endOfLife = endOfLife;
		this.currentScalability = currentScalability;
		this.expectedScalability = expectedScalability;
		this.currentPerformance = currentPerformance;
		this.expectedPerformance = expectedPerformance;
		this.currentSecurityLevel = currentSecurityLevel;
		this.expectedSecurityLevel = expectedSecurityLevel;
		this.currentStability = currentStability;
		this.expectedStability = expectedStability;
		this.costCurrency = costCurrency;
		this.currentValue = currentValue;
		this.currentYearlyCost = currentYearlyCost;
		this.timeValue = timeValue;
	}

    @Override
    public String toString() {
        return "ITApplication{" +
                "id=" + itApplicationId +
                ", status=" + status +
                ", applicationName='" + name + '\'' +
                ", version='" + version + '\'' +
                ", purchaseDate=" + purchaseDate +
                ", endOfLife=" + endOfLife +
                ", currentScalability='" + currentScalability + '\'' +
                ", expectedScalability='" + expectedScalability + '\'' +
                ", currentPerformance='" + currentPerformance + '\'' +
                ", expectedPerformance='" + expectedPerformance + '\'' +
                ", currentSecurityLevel='" + currentSecurityLevel + '\'' +
                ", expectedSecurityLevel='" + expectedSecurityLevel + '\'' +
                ", currentStability='" + currentStability + '\'' +
                ", expectedStability='" + expectedStability + '\'' +
                ", costCurrency='" + costCurrency + '\'' +
                ", currentValue='" + currentValue + '\'' +
                ", currentYearlyCost=" + currentYearlyCost +
                ", timeValue=" + timeValue +
                '}';
    }
}
